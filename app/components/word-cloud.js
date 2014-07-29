/* global d3:true*/ /* global _:true */
import Ember from 'ember';

/**
 * Component generate a word cloud
 * @class WordCloudComponent
 */
export default Ember.Component.extend({

    /**
     * Generate a word cloud when render the component
     * @method didInsertElement
     */
    didInsertElement: function() {
        Ember.run.once(this, 'generateWordCloud');
    },

    /**
     * Generate a word cloud. Get topics passed to component and use the D3 library to generate the word cloud with these topics.
     * @method generateWordCloud
     */
    generateWordCloud: function() {
        var that = this,
            topics = this.get('data'),
            maxScore,
            wordScale;


        if (!topics || _.isEmpty(topics)) {
            return;
        }

        //Get the topic with maximum sentiment score
        maxScore = _.max(topics, function(topic) { return topic.sentimentScore; }).sentimentScore;
        //Create one scale for calculate the size of words based on its sentiment score
        wordScale = d3.scale.linear().domain([0, maxScore]).range([0, 100, 200, 300, 400, 500]);

        //Map topics in order to get only some attributes
        topics = topics.map(function(topic) {
            return { text: topic.label,
                     size: wordScale(topic.sentimentScore),
                     sentimentScore: topic.sentimentScore,
                     volume: topic.volume,
                     sentiment: topic.sentiment
                  };
        });

        //Config word cloud
        d3.layout.cloud()
            .size([600, 600])
            .words(topics)
            .padding(2)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

        //Render word cloud
        function draw(words) {
            d3.select("body .col-md-8")
                .append("svg")
                .attr("id", "word-cloud-topics")
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
                    that.get('topicsController').send('setSelectedTopic', d);
                });
        }
    },

    /**
     * Get color according of sentiment score
     * @method getColorBySentiment
     * @param sentiment
     * @returns {string} color
     */
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
