pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/shashank-bhojappa/employee-registration.git'
            }
        }
        stage('Docker build Backend') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '132ba281-4fc6-448d-8136-c77975831d7e') {
                            echo "docker build -t shashankbhojappa/server-side --load -f server/Dockerfile ."
                    }
                }
            }
        }
        stage('Docker push Backend') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '132ba281-4fc6-448d-8136-c77975831d7e') {
                        echo "docker push shashankbhojappa/server-side"
                    }
                }
            }
        }
        stage('Docker build Frontend') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '132ba281-4fc6-448d-8136-c77975831d7e') {
                        dir('client'){
                           echo "docker build -t shashankbhojappa/client-side ."
                        }
                    }
                }
            }
        }
        stage('Docker push Frontend') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '132ba281-4fc6-448d-8136-c77975831d7e') {
                        echo "docker push shashankbhojappa/client-side"
                    }
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '132ba281-4fc6-448d-8136-c77975831d7e') {
                        sh "docker run -d -p 3000:3000 shashankbhojappa/server-side"
                    }
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '132ba281-4fc6-448d-8136-c77975831d7e') {
                        sh "docker run -d -p 4200:80 shashankbhojappa/client-side"
                    }
                }
            }
        }
    }
    
}