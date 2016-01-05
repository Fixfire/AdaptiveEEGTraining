// CLASS DATAPACKET //

/**
* Function for creating a packet object.
**/
function Packet(attention, meditation, loAlpha, hiAlpha, loBeta, hiBetam, loGamma, midGamma, theta , delta, timestamp) {
    this.attention = attention;
    this.meditation = meditation;
    this.loAlpha = loAlpha;
    this.hiAlpha = hiAlpha;
    this.loBeta = loBeta;
    this.hiBeta = hiBeta;
    this.loGamma = loGamma;
    this.midGamma = midGamma;
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
Packet.randomPacketJSONGenerator = function() {
    var attention = Math.floor((Math.random() * 100) + 1);
    var hiAlpha = Math.floor((Math.random() * 100) + 1);
    var loAlpha = Math.floor((Math.random() * 100) + 1);
    var loBeta = Math.floor((Math.random() * 100) + 1);
    var hiBeta = Math.floor((Math.random() * 100) + 1);
    var loGamma = Math.floor((Math.random() * 100) + 1);
    var midGamma = Math.floor((Math.random() * 100) + 1);
    var theta = Math.floor((Math.random() * 100) + 1);
    var delta = Math.floor((Math.random() * 100) + 1);
    var relaxation   = Math.floor((Math.random() * 100) + 1);
    var meditation = Math.floor((Math.random() * 100) + 1);
    var timestamp = new Date().getTime();
    return new Packet(attention, meditation, loAlpha, hiAlpha, loBeta, hiBetam, loGamma, midGamma, theta , delta, timestamp) ;
}

//Export class

module.exports = Packet
