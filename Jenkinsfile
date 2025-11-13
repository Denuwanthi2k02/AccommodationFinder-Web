pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        DOCKERHUB_USERNAME = 'denuwanthi2k02'
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
                        # Build frontend Docker image
                        docker build -t ${DOCKERHUB_USERNAME}/accommodationfinder-frontend:latest ./client

                        # Login and push
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
                        # Build backend Docker image
                        docker build -t ${DOCKERHUB_USERNAME}/accommodationfinder-backend:latest ./server

                        # Login and push
                        echo "$PASS" | docker login -u "$USER" --password-stdin
                        docker push ${DOCKERHUB_USERNAME}/accommodationfinder-backend:latest
                        docker logout
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
