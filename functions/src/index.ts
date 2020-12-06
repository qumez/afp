import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Authorization');
  response.send({ message: 'Hello World!' });
});

//
exports.authTest = functions.https.onRequest(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Authorization');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (request.method === 'OPTIONS') {
    response.sendStatus(200);
    return;
  }

  const token = request.get('Authorization') || '';
  const authenticatedResponse = await authenticateRequest(token);
  if (authenticatedResponse) {
    response.send({
      message: 'Hello from the Firebase Secret Club!',
    });
  } else {
    response.sendStatus(403);
  }
});

async function authenticateRequest(
  authBearer: string
): Promise<admin.auth.DecodedIdToken | undefined> {
  const tokenId = authBearer.split('Bearer ')[1] || '';
  let authToken: admin.auth.DecodedIdToken | undefined;
  try {
    authToken = await admin.auth().verifyIdToken(tokenId);
  } catch (ex) {
    authToken = undefined;
  }
  return authToken;
}
