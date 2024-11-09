pipeline {
    agent any

    environment {
        // Define the paths to where the results should be stored
        REPORT_DIR = "/usr/src/app/test-results"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Use the GitHub credentials (github-credentials) for SCM
                    checkout scm: [
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],  // Adjust the branch name as needed
                        userRemoteConfigs: [
                            [
                                url: 'https://github.com/humbertogfs55/Calculadora-jest-S107',  // Replace with your repo URL
                                credentialsId: 'github-credentials'  // This is the ID you specified in jenkins.yml
                            ]
                        ]
                    ]
                }
            }
        }
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    // Run tests inside the Node.js container
                    docker-compose -f docker-compose.yml run --rm node npm test
                }
            }
            post {
                success {
                    echo 'Tests passed, proceeding to build the app...'
                }
                failure {
                    echo 'Tests failed, skipping build and notification steps.'
                    currentBuild.result = 'FAILURE'
                    // Prevent further stages from running
                    return
                }
            }
        }

        stage('Build Electron App') {
            when {
                branch 'main'  // Only run the build on the main branch
            }
            steps {
                script {
                    // Run the Electron build inside the same Node.js container
                    docker-compose -f docker-compose.yml run --rm node npm run build
                }
            }
            post {
                success {
                    echo 'Build successful, proceeding to notification...'
                }
                failure {
                    echo 'Build failed, skipping notification step.'
                    currentBuild.result = 'FAILURE'
                    // Prevent further stages from running
                    return
                }
            }
        }

        stage('Notification') {
            when {
                branch 'main'  // Only send notification on the main branch
            }
            steps {
                echo 'Sending notification...'
                sh '''
                   cd scripts
                   chmod 775 *
                   ./shell.sh
                   '''
            }
            post {
                success {
                    echo 'Notification sent successfully.'
                }
                failure {
                    echo 'Notification failed.'
                }
            }
        }
    }
}
