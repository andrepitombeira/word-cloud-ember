/* global d3:true*/ /* global _:true */
import Ember from 'ember';

export default Ember.Component.extend({

    didInsertElement: function() {
        Ember.run.once(this, 'generateWordCloud');
    },

    generateWordCloud: function() {
        var that = this,
            topics = this.get('data'),
            maxScore,
            wordScale;


        if (!topics || _.isEmpty(topics)) {
            return;
        }

        maxScore = _.max(topics, function(topic) { return topic.sentimentScore; }).sentimentScore;
        wordScale = d3.scale.linear().domain([0, maxScore]).range([0, 100, 200, 300, 400, 500]);

        topics = topics.map(function(topic) {
            return { text: topic.label,
                     size: wordScale(topic.sentimentScore),
                     sentimentScore: topic.sentimentScore,
                     volume: topic.volume,
                     sentiment: topic.sentiment
                  };
        });

        d3.layout.cloud()
            .size([600, 600])
            .words(topics)
            .padding(2)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

        function draw(words) {
            d3.select("body .col-md-8").append("svg")
                .attr("width", 600)
                .attr("height", 600)
                .append("g")
                .attr("transform", "translate(300,300)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d) { return that.getColorBySentiment(d.sentimentScore); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; })
                .on("click", function(d) {
                    that.get('topicsController').send('setTopic', d);
                });
        }
    },

    getColorBySentiment: function(sentiment) {
        if (sentiment > 60) {
            return "green";
        } else if (sentiment < 40) {
            return "red";
        } else {
            return "gray";
        }
    }
});
