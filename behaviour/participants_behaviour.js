// var tagsInput = document.getElementsByClassName('u-tagsinput')

// var tagsInput = document.querySelector('[data-role="tagsinput"]')
//
// console.log(tagsInput);
// // Listen for the user to start typing
// tagsInput.addEventListener('search', function (event) {
//     // Clear the current options
//     tagsInput.clearOptions()
//
//     // The current value of the tags-input is going to be available in event.detail
//     var query = event.detail
//
//     // Create an array to proxy our test data matches
//     var options = []
//
//     // Create a regex based on our query
//     var regex = new RegExp(query, 'i')
//
//     // Loop through our test data
//     data.forEach(function (datum) {
//         // If the datum matches, add it to our options array
//         if (regex.test(datum)) {
//             options.push(datum)
//         }
//     })
//
//     // Pass our options array to the tags-input so it can display them in the dropdown
//     tagsInput.updateOptions(options)
// })
//
// tagsInput.addEventListener('remove', function (event) {
//     console.log(event.detail)
// })
//
// tagsInput.addEventListener('add', function (event) {
//     console.log(event.detail);
//     console.log("aaa");
// })

$('#tag').on('itemAdded', function(event) {
    console.log('item added : '+event.item);
});

$("#tag").on('itemRemoved', function(event) {
    console.log('item removed : '+event.item);
});