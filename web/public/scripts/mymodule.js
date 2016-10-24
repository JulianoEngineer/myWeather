(function(exports){

    // your code goes here

  exports.test = function(responseObj){
        var dados = mongoose.model('Temperatura');

        dados.find({}, function(err, data)
        {
                if(err){
                        console.log(err, data, data.length);
                }else{
                  //console.log(data);
                }

                var Time = [];
                var Temperature = [];
                var Grafico = [];


                for ( index in data){

                  var doc = data[index];
                  var objectId = new ObjectID(doc['_id'])
                  var time = objectId.getTimestamp();
                  var temperature = doc['temp'];

                  Temperature.push(temperature);
                  Time.push(time);

                  }

        /*dataset = [
          {
            "seriesname" : "Temperature",
            "data" : Temperature
          }
        ];*/

        response = {
          "x" : Temperature,
          "y" : Time
        };
        responseObj.json(response);
        }).sort('-date').limit(50);
    };

})(typeof exports === 'undefined'? this['mymodule']={}: exports);