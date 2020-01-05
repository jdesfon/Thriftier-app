export default {
  MAX_ATTACHMENT_SIZE: 10000000,
  AUTHORIZED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/tiff',
    'image/gif',
    'application/pdf',
  ],
  s3: {
    REGION: process.env.VUE_APP_AWS_REGION,
    BUCKET: process.env.VUE_APP_S3_BUCKET_NAME,
  },
  apiGateway: {
    REGION: process.env.VUE_APP_AWS_REGION,
    URL: process.env.VUE_APP_API_GATEWAY_URL,
  },
  cognito: {
    REGION: process.env.VUE_APP_AWS_REGION,
    USER_POOL_ID: process.env.VUE_APP_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.VUE_APP_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.VUE_APP_IDENTITY_POOL_ID,
  },
};
