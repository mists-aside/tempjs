@Library('my-jenkins-shared') _

pipeline {
  agent {
    label 'master' // test-1
  }

  environment {
    NVM_DIR = "${HOME}/.nvm"
    NVM_LOAD = ". ~/.bashrc > /dev/null; set -ex; nvm use 12;"
  }

  stages {
    stage('nvm info') {
      steps {
        echo "NVM lies in ${NVM_DIR}"

        sh """
          set -ex;
          . ~/.bashrc;

          node --version;
          npm --version;
          nvm --version;
          """
      }
    }

    stage('init') {
      steps {
        script {
          sh """
            ${NVM_LOAD}
            npm install;
          """
        }
      }
    }

    stage('test') {
      steps {
        script {
          sh """
            ${NVM_LOAD}
            npm run test;
          """
        }
      }
    }

    stage('pre-release') {
      when {
        anyOf {
          branch 'master';
          branch 'develop';
        }
      }
      steps {
        script {
          env.COMMIT_MESSAGE = GitLastCommitMessage()
        }
        sh "echo \"Commit Message: ${env.COMMIT_MESSAGE}\""
      }
    }
  }
}
