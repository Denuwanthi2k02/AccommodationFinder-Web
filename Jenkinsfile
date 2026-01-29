pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        DOCKERHUB_USERNAME = 'denuwanthi2k02'
        EC2_USER = 'ubuntu'
        EC2_IP = '13.201.72.207' 
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Denuwanthi2k02/AccommodationFinder-Web.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Build & Push Frontend') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                        docker build -t ${DOCKERHUB_USERNAME}/accommodationfinder-frontend:latest ./client
                        echo "$PASS" | docker login -u "$USER" --password-stdin
                        docker push ${DOCKERHUB_USERNAME}/accommodationfinder-frontend:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Build & Push Backend') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                        docker build -t ${DOCKERHUB_USERNAME}/accommodationfinder-backend:latest ./server
                        echo "$PASS" | docker login -u "$USER" --password-stdin
                        docker push ${DOCKERHUB_USERNAME}/accommodationfinder-backend:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                sshagent(['aws-ec2-key']) {
                    sh '''
                        # 1. Copy the production docker-compose file to the server
                        scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${EC2_USER}@${EC2_IP}:/home/ubuntu/docker-compose.yml
                        
                        # 2. Command the server to pull new images and restart
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} << 'EOF'
                            # Wait for Docker to be ready (useful on first run)
                            while ! command -v docker-compose &> /dev/null; do echo "Waiting for docker-compose..."; sleep 5; done
                            
                            docker-compose pull
                            docker-compose up -d
                            docker image prune -f
                        EOF
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}