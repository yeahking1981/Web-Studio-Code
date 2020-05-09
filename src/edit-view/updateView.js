export default function (viewNode, texts) {

    let template = "";

    texts.forEach(line => {

        template += "<div>";

        line.forEach(text => {

            template += "<span style='color:" + text.color + "'>" + text.content + "</span>";

        });

        template += "</div>";

    });

    viewNode[0].innerHTML = template;
};