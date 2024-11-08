pipeline {
    agent any

    environment {
        // Define the paths to where the results should be stored
        REPORT_DIR = "/usr/src/app/test-results"
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    // Run tests inside the Node.js container
                    docker-compose -f docker-compose.yml run --rm node npm test
                }
            }
        }

        stage('Notification') {
            steps {
                echo 'Notification...'
                sh '''
                   cd scripts
                   chmod 775 *
                   ./shell.sh
                   '''
            }
        }
    }

}
