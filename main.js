var main = (function() {

    function AdaptiveEeg() {
    }

    AdaptiveEeg.prototype.init = function() {
    };

    return {
        AdaptiveEeg: AdaptiveEeg
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    var AdaptiveEeg = new main.AdaptiveEeg();
    AdaptiveEeg.init();
});