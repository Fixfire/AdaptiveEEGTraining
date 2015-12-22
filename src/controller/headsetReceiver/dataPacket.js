/**
* Function for creating a packe object.
**/
function Packet(attention, relaxation, alfa, beta, theta , delta, timestamp) {
    this.attention = attention;
    this.relaxation = relaxation;
    this.alfa = alfa;
    this.beta = beta;
    this.theta = theta;
    this.delta = delta;
    this.timestamp = timestamp;
}

/**
* Function for creating a new pakcet and return it externally to another module.
**/
exports.pakcetCreator = function(attention, relaxation, alfa, beta, theta , delta, timestamp) {
    return new Packet(attention,relaxation,alfa,beta,theta,delta,timestamp);
}

/**
* Function for generating a random packet for an external module.
**/
exports.randomPacketGenerator = function() {
    var attention = Math.floor((Math.random() * 100) + 1);
    var alfa = Math.floor((Math.random() * 100) + 1);
    var beta = Math.floor((Math.random() * 100) + 1);
    var theta = Math.floor((Math.random() * 100) + 1);
    var delta = Math.floor((Math.random() * 100) + 1);
    var relaxation   = Math.floor((Math.random() * 100) + 1);
    var attention = Math.floor((Math.random() * 100) + 1);
    var timestamp = new Date().getTime();
    return new Packet(attention,relaxation,alfa,beta,theta,delta,timestamp);
}