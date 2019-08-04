const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

console.log('Updated');

// update counts
function updateCounts(courseId) {
  var difficulty = 0;
  var diffNum = 0;
  var rating = 0;
  var ratingNum = 0;
  var workload = 0;
  var workNum = 0;
  /*
        "average": {
                "difficulty": 2.44,
                "rating": 3.7096774193548385,
                "workload": 47.72
            },
            "reviews": {
    */
  var avgRef = admin.database().ref('courses/' + courseId + '/average');
  return admin
    .database()
    .ref('courses/' + courseId + '/reviews')
    .once('value')
    .then(function(snapshot) {
      var reads = [];
      snapshot.forEach(reviewChild => {
        var id = reviewChild.key;
        if (reviewChild && reviewChild.val() === true) {
          var prm = admin
            .database()
            .ref('reviews/' + id)
            .once('value')
            .then(rev => {
              var review = rev.val();
              if (review && review !== null) {
                if (review.difficulty) {
                  difficulty += parseInt(review.difficulty, 10);
                  diffNum++;
                }
                if (review.rating) {
                  rating += parseInt(review.rating, 10);
                  ratingNum++;
                }
                if (review.workload) {
                  workload += parseInt(review.workload, 10);
                  workNum++;
                }
              }
            });
          reads.push(prm);
        }
      });

      return Promise.all(reads).then(function() {
        var update = {
          difficulty: difficulty / diffNum,
          rating: rating / ratingNum,
          workload: workload / workNum,
        };
        return avgRef.update(update);
      });
    });
}

function updateAuthorCourse(authorId, courseId, reviewId, value) {
  var update = {};
  update[reviewId] = value;
  return admin
    .database()
    .ref('/users/' + authorId + '/reviews/')
    .update(update)
    .then(() => {
      return admin
        .database()
        .ref('/courses/' + courseId + '/reviews/')
        .update(update);
    });
}

// when a review is created, add to author list
// when a review is created, add to course list
// when a review is created, update counts
exports.newReview = functions.database
  .ref('/reviews/{pushId}/')
  .onCreate((data, context) => {
    const original = data.val();
    /*
        "author": "IoEyvOStggUiM8ueeeTKqF8wuSA3",
        "course": "6040",
        "created": "2017-11-20T23:20:56Z",
        "difficulty": 3,
        "rating": 3,
        "semester": "2017-3",
        "text": "asfasdf",
        "workload": 1000
    */
    const originalKey = data.key;
    console.log('new review: ', originalKey);
    console.log(JSON.stringify(original));
    return updateAuthorCourse(
      original.author,
      original.course,
      originalKey,
      true
    ).then(function() {
      return updateCounts(original.course);
    });
  });

// when a review is modified, update counts
exports.modifiedReview = functions.database
  .ref('/reviews/{pushId}/')
  .onUpdate((data, context) => {
    // avoid infinite loop when updating counts...
    const original = data.before.val();
    return updateCounts(original.course);
  });

// when a review is removed, update counts
// when a review is removed, remove from author list
// when a review is removed, remove from course list
exports.deletedReview = functions.database
  .ref('/reviews/{pushId}/')
  .onDelete((data, context) => {
    const original = data.val();
    const originalKey = data.key;
    if (original && original !== null) {
      return updateAuthorCourse(
        original.author,
        original.course,
        originalKey,
        null
      ).then(function() {
        return updateCounts(original.course);
      });
    }
  });