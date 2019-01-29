var Counter = function(startValue){
    this.value = startValue;
};

Counter.prototype.increment = function() {
    this.value += 1;
    return this.value;
};

Counter.prototype.decrement = function() {
    this.value -= 1;
    return this.value;
};

Counter.prototype.getValue = function(){
    return this.value;
};


Counter.prototype.setValue = function(value){
    this.value =value;
};
