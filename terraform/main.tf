provider "aws" {
  region = "ap-south-1" # Mumbai
}

# 1. Automatically find the latest Ubuntu 22.04 AMI for the current region
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] 

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# 2. Create a Security Group for Accommodation App
resource "aws_security_group" "accommodation_sg" {
  name        = "accommodation_finder_sg_new" 
  description = "Allow web and ssh traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. Create Security Group for Jenkins
resource "aws_security_group" "jenkins_sg" {
  name        = "jenkins-server-sg"
  description = "Security group for Jenkins server"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH access"
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Jenkins web UI and webhook"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "jenkins-server-sg"
  }
}

# 4. Generate SSH Key Pair for Accommodation App
resource "tls_private_key" "rsa_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "app_key" {
  key_name   = "accommodation-key-mumbai"
  public_key = tls_private_key.rsa_key.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.rsa_key.private_key_pem
  filename = "accommodation-key.pem"
}

# 5. Generate SSH Key Pair for Jenkins
resource "tls_private_key" "jenkins_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "jenkins_key" {
  key_name   = "jenkins-server-key"
  public_key = tls_private_key.jenkins_key.public_key_openssh
}

resource "local_file" "jenkins_private_key" {
  content  = tls_private_key.jenkins_key.private_key_pem
  filename = "jenkins-key.pem"
  file_permission = "0400"
}

# 6. Create the Accommodation App EC2 Instance
resource "aws_instance" "app_server" {
  ami           = data.aws_ami.ubuntu.id 
  instance_type = "t3.micro"
  
  key_name      = aws_key_pair.app_key.key_name
  vpc_security_group_ids = [aws_security_group.accommodation_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu
              
              # Install Docker Compose
              sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              EOF

  tags = {
    Name = "AccommodationFinderServer"
  }
}

# 7. Create Jenkins EC2 Instance
resource "aws_instance" "jenkins_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro" # Free tier eligible

  key_name               = aws_key_pair.jenkins_key.key_name
  vpc_security_group_ids = [aws_security_group.jenkins_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    set -e
    
    # Update system
    sudo apt-get update -y
    sudo apt-get upgrade -y

    # Install Java (required for Jenkins)
    sudo apt-get install -y openjdk-17-jdk

    # Add Jenkins repository and install Jenkins
    curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
      /usr/share/keyrings/jenkins-keyring.asc > /dev/null
    
    echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
      https://pkg.jenkins.io/debian-stable binary/" | sudo tee \
      /etc/apt/sources.list.d/jenkins.list > /dev/null

    sudo apt-get update -y
    sudo apt-get install -y jenkins

    # Install Docker (for your pipeline)
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker

    # Add Jenkins and ubuntu users to docker group
    sudo usermod -aG docker jenkins
    sudo usermod -aG docker ubuntu

    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" \
      -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    # Start Jenkins
    sudo systemctl start jenkins
    sudo systemctl enable jenkins

    # Wait for Jenkins to fully start
    sleep 60

    # Output the initial admin password to a file (for easy access)
    sudo cat /var/lib/jenkins/secrets/initialAdminPassword > /home/ubuntu/jenkins-initial-password.txt
    sudo chown ubuntu:ubuntu /home/ubuntu/jenkins-initial-password.txt

    echo "Jenkins installation complete!" > /home/ubuntu/installation-log.txt
  EOF

  tags = {
    Name = "Jenkins-Server"
  }
}

# Outputs for Accommodation App
output "app_server_public_ip" {
  value = aws_instance.app_server.public_ip
  description = "Public IP of Accommodation App Server"
}

output "app_server_ssh_command" {
  value = "ssh -i accommodation-key.pem ubuntu@${aws_instance.app_server.public_ip}"
  description = "SSH command to connect to Accommodation App Server"
}

# Outputs for Jenkins Server
output "jenkins_public_ip" {
  value       = aws_instance.jenkins_server.public_ip
  description = "Public IP of Jenkins server - use this in GitHub webhook"
}

output "jenkins_url" {
  value       = "http://${aws_instance.jenkins_server.public_ip}:8080"
  description = "Jenkins web interface URL"
}

output "jenkins_ssh_command" {
  value = "ssh -i jenkins-key.pem ubuntu@${aws_instance.jenkins_server.public_ip}"
  description = "SSH command to connect to Jenkins server"
}

output "get_jenkins_password" {
  value       = "ssh -i jenkins-key.pem ubuntu@${aws_instance.jenkins_server.public_ip} 'cat /home/ubuntu/jenkins-initial-password.txt'"
  description = "Command to get Jenkins initial admin password"
}

output "github_webhook_url" {
  value       = "http://${aws_instance.jenkins_server.public_ip}:8080/github-webhook/"
  description = "GitHub webhook URL (copy this to GitHub repository settings)"
}