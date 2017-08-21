var request = require('request');
var API_END_POINT = 'https://www.googleapis.com/youtube/v3/search';

var callAPI = function(resource, qs, callback) {

    if(resource == 'videoSearch'){
        //console.log("value of qs "+qs.res_id);
        resource = "?" + "part=snippet&order=viewcount&" + "q="+ qs.search+ "&type=video&videoDefinition=high&";
        console.log(resource);
    }

    var options = {
        method: 'GET',
        url: API_END_POINT + resource + "key=" + YOUTUBE_ACCESS_TOKEN,
        headers: {
            'content-type': 'application/json'
        }
    };
    request(options, function(error, response, body) {
        //console.log(options.url + "?" + "res_id=" + qs.res_id);
        callback(error, response);
    });
};

var Youtube = function(user_key) {
    YOUTUBE_ACCESS_TOKEN = user_key;

    // this.verify = function(callback) {
    //     callAPI('abs', {}, function(error, response) {
    //         if (error) {
    //             callback(false);
    //             return;
    //         }
    //         callback(true);
    //     });
    // };

    // Common APIs
    this.getVideoSearch = function(options, callback) {
        callAPI('videoSearch', options, callback);
    };

    // Location Specific APIs
    this.getGeoCode = function(latitide, longitude, callback) {
        callAPI('/geocode', {
            lat: latitide,
            lon: longitude
        }, callback);
    };

    this.getLocationDetails = function(entityId, entityType, callback) {
        callAPI('/location_details', {
            entity_id: entityId,
            entity_type: entityType
        }, callback);
    };

    this.getLocations = function(placeName, callback) {
        callAPI('/locations', {
            query: placeName,
        }, callback);
    };


    // Restraunt Specific APIs
    this.getDailyMenu = function(restaurantId, callback) {
        callAPI('/dailymenu', {
            res_id: restaurantId
        }, callback);
    };

    this.getRestaurant = function(restaurantId, callback) {
        console.log(restaurantId);
        callAPI('/restaurant', {
            res_id: restaurantId
        }, callback);
    };

    this.getReviewsForRestaurant = function(restaurantId, options, callback) {
        var qs = options;
        qs.res_id = restaurantId;
        callAPI('/reviews', qs, callback);
    };

    this.search = function(options, callback) {
        console.log(options.entity_id);
        console.log(options.entity_type);
        callAPI('/search', options, callback);
    };

};

exports.Youtube = Youtube;
