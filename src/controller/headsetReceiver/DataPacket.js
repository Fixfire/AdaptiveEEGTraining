// CLASS DATAPACKET //

/**
* Function for creating a packet object.
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

//Class methods

Packet.prototype.getTimestamp = function() {
    return this.timestamp;
}

Packet.prototype.getAttention = function() {
    return this.attention;
}

Packet.prototype.getRelaxation = function() {
    return this.relaxation;
}


/**
* Function for generating a random packet for an external module.
**/
Packet.randomPacketGenerator = function() {
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

//Export class

module.exports = Packet
