import { Storage } from 'aws-amplify';

async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

async function s3FileUrl(fileKey) {
  const fileURL = await Storage.vault.get(fileKey);
  return fileURL;
}

export {
  s3Upload,
  s3FileUrl,
};
