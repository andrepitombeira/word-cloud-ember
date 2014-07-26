/* global d3:true */
import Ember from 'ember';

export default Ember.Component.extend({

    didInsertElement: function() {
        Ember.run.once(this, 'generateWordCloud');
    },

    generateWordCloud: function() {
        var fill = d3.scale.category20(),
            words = this.get('data').map(function(topic) {
                return {text: topic.label, size: topic.sentimentScore, sentiment:topic.sentimentScore};
            });

        d3.layout.cloud()
            .size([600, 600])
            .words(words)
            .padding(2)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return Math.max(8, Math.min(d.size, 24)); })
            .on("end", draw)
            .start();

        function draw(words) {
            d3.select("body").append("svg")
                .attr("width", 600)
                .attr("height", 600)
                .append("g")
                .attr("transform", "translate(300,300)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d) { return getColorBySentiment(d.sentiment); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; })
                .on("click", function(d) {
                    console.log(d.text);
                });
        }

        function getColorBySentiment(sentiment) {
            if (sentiment > 60) {
                return "green";
            } else if (sentiment < 40) {
                return "red";
            } else {
                return "gray";
            }
        }
    }
});
