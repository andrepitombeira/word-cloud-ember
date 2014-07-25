/* global d3:true */
import Ember from 'ember';

export default Ember.Component.extend({

    didInsertElement: function() {
        Ember.run.once(this, 'generateWordCloud');
    },

    generateWordCloud: function() {
        var fill = d3.scale.category20(),
            words = this.get('data').map(function(topic) {
                return {text: topic.label, size: topic.sentimentScore};
            });

        d3.layout.cloud().size([300, 300])
            .words(words)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

        function draw(words) {
            d3.select("body").append("svg")
                .attr("width", 300)
                .attr("height", 300)
                .append("g")
                .attr("transform", "translate(150,150)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    }
});
