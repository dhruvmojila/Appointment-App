const functions = require("firebase-functions");

exports.onCreateTrigger = functions.firestore
  .document("Users/{docId}")
  .onCreate((queryDocumentSnapshot, eventContext) => {
    // ID of newly created document
    const newlyCreatedDocumentID = eventContext.params.docId;

    // Retrieve value from data
    const createdData = queryDocumentSnapshot.data();
    console.log(createdData);
    // const fooValueSyntax1 = createdData.fooKey;
    // const fooValueSyntax2 = createdData["fooKey"];
    // const fooValueSyntax3 = queryDocumentSnapshot.get("fooKey");

    return 0;
  });
