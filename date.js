exports.getDate = function() {
    return new Date().toLocaleDateString("en-US", { weekday:"long", day:"numeric", month:"long", year:"numeric"});
}

exports.getDay = function() {
    return new Date().toLocaleDateString("en-US", { weekday:"long"});
}