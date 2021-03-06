@Library('my-jenkins-shared') _

def modules = [:]
pipeline {
  agent {
    label 'master' // test-1
  }

  environment {
    // NODE_VERSIONS = "10 12 13 14 15 16"
    // error dependency-cruiser@10.0.1: The engine "node" is incompatible with this module. Expected version "^12.20||^14||>=16".
    // error @babel/eslint-parser@7.14.2: The engine "node" is incompatible with this module. Expected version "^10.13.0 || ^12.13.0 || >=14.0.0".0
    NODE_VERSIONS = "12 14 16"
    NODE_VERSION_DEFAULT = "14"
    RUN_SONAR_SCANNER = 'yes'
  }

  parameters {
    string(
      defaultValue: '',
      description: 'Node.js version to run tests for',
      name: 'NODE_VERSION',
      trim: true
    )
  }

  stages {
    stage('Run by Node.js Version') {
      when {
        expression { params.NODE_VERSION != '' }
      }
      stages {
        stage('Info') {
          steps {
            script {
              nvm.info()
            }
          }
        }
        stage('Init') {
          steps {
            script {
              // nvm.runSh 'npm i', params.NODE_VERSION
              npm.install([
                cacheKey: "node_v${env.NODE_VERSION}",
                manager:'npm',
                useNvm: true,
                nodeVersion: params.NODE_VERSION
              ])
            }
          }
        }
        stage("Code Analysis") {
          steps {
            script {
              nvm.runSh "npm run ca", params.NODE_VERSION
            }
          }
        }
        stage("Code UnitTest") {
          steps {
            script {
              nvm.runSh "npm run test", params.NODE_VERSION
            }
          }
        }
        stage("Code Sonar") {
          when {
            expression {
              return env.RUN_SONAR_SCANNER &&
                env.RUN_SONAR_SCANNER.toLowerCase() ==~ /(1|y(es)?)/
            }
          }
          steps {
            script {
              if (params.NODE_VERSION == env.NODE_VERSION_DEFAULT) {
                withCredentials([
                  string(credentialsId: 'sonar_server_host', variable: 'SONAR_HOST'),
                  string(credentialsId: 'sonar_server_login', variable: 'SONAR_LOGIN')
                ]) {
                  nvm.runSh "npm run sonar -- -Dsonar.host.url=${SONAR_HOST} -Dsonar.login=${SONAR_LOGIN}", params.NODE_VERSION
                }
              } else {
                echo "skip"
              }
            }
          }
        }
        stage("Code Docs") {
          steps {
            script {
              if (params.NODE_VERSION == env.NODE_VERSION_DEFAULT) {
                nvm.runSh "npm run docs", params.NODE_VERSION
              } else {
                echo "skipped"
              }
            }
          }
        }
        stage("Code Build") {
          steps {
            script {
              nvm.runSh "npm run build", params.NODE_VERSION
            }
          }
        }
        stage('Release') {
          when {
            anyOf {
              branch 'master';
              branch 'develop';
            }
            expression { return env.NODE_VERSION == env.NODE_VERSION_DEFAULT }
          }
          steps {
            script {
              npm.release([
                gitUrl: 'github.com/mists-aside/tempjs',
                gitCredentialsId: '52e756f6-5625-41fb-bde9-ead983f84629',
                npmTokenCredentialId: '83811fdb-744b-45ab-acdb-54ab3baf50b5',
                useNvm: true,
                nodeVersion: params.NODE_VERSION,
                releaseItArgs: env.BRANCH_NAME == 'master' ? '--patch' : '--preRelease=beta'
              ])
            }
          }
        }
      }
    }
    stage("Run All Versions") {
      when {
        expression { params.NODE_VERSION == '' }
      }
      steps {
        script {
          parallel env.NODE_VERSIONS.split(' ').collectEntries {
            ["node-${it}": {
              node {
                stage("Node.js ${it}.x") {
                  build job: "${env.JOB_NAME}", parameters: [
                    string(name: 'NODE_VERSION', value: "${it}"),
                  ], wait: false
                }
              }
            }]
          }
        }
      }
    }
  }
  post {
    // https://www.jenkins.io/doc/pipeline/tour/post/
    // https://plugins.jenkins.io/telegram-notifications/
    always {
      script {
        cleanWs()
      }
    }
    failure {
      script {
        telegram.sendStatusFail('jk_pipeline_report_to_telegram_token','jk_pipeline_report_to_telegram_chatId')
      }
    }
    success {
      script {
        telegram.sendStatusOk('jk_pipeline_report_to_telegram_token','jk_pipeline_report_to_telegram_chatId')
      }
    }
  }
}
