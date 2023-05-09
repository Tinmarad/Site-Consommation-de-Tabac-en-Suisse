import { index, reverse } from "d3";
import { csv } from "d3-fetch";
import scrollama from "scrollama";
import * as d3 from "d3";

csv("/data.csv")
  .then(function (dataCigarettes) {
    // set the dimensions and margins of the graph
    const margin = { top: 0, right: 0, bottom: 0, left: 50 },
      width = 700 - margin.left - margin.right,
      height = 420 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // Lorsque la page est chargée, définit la position de défilement du corps (body) à 0

    const svg = d3
      .select("#avicii_viz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // set colours for plot
    const color_mapping = {
      red: "#A6055D",
      grey: "#777",
      green: "#00C184",
    };
    // Texte Camion
    var textNode = svg
      .append("text")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .attr("class", "poids-texte")
      .attr("x", 100)
      .attr("y", height / 2)
      .text("259 X");
    // Add X axis
    const x = d3.scaleLinear().domain([0, 0]).range([0, 600]);

    svg
      .append("g")
      .attr("class", "Xaxis axis")
      .style("opacity", 0)
      .call(d3.axisTop(x));

    svg
      .append("text")
      .attr("class", "Xaxis-label")
      .style("opacity", 0)
      .attr("transform", `translate(${width / 2},270)`)
      .style("text-anchor", "middle")
      .text("Distance en km");

    //console.log(svg.select(".Xaxis > .tick > text"));
    //svg.select(".Xaxis > .tick > text").attr("y", 100);

    // Add Y axis

    const y = d3.scaleLinear().domain([0, 0]).range([0, 390]);

    svg
      .append("g")
      .attr("class", "Yaxis axis")
      .style("opacity", 0)
      .call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("class", "Yaxis-label")
      .attr("transform", `translate(-20,${height / 2}) rotate(-90)`)
      .style("text-anchor", "middle")
      .style("opacity", 0)
      .text("Pourcentage de fumeurs passifs");

    svg.select(".Xaxis > .tick > text").attr("dy", 9);

    var tooltip = d3
      .select("#avicii_viz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip");

    // change tooltip text based on position in story
    function returnTooltipText(step, d) {
      switch (step) {
        case "title":
          return d.index + ": " + d.title;
          break;
        case "title score":
          return d.index + ": " + d.title + " - sentiment score: " + d.score;
          break;
        case "title score magnitude":
          return (
            d.index +
            ": " +
            d.title +
            " - sentiment score: " +
            d.score +
            " - magnitude: " +
            d.magnitude
          );
          break;
      }
    }

    // create 2 functions to show and hide the tooltip
    var showTooltip = function (d) {
      tooltip.transition().duration(200);
      tooltip.style("opacity", 1).html(returnTooltipText(toolTipState, d));
    };

    var hideTooltip = function (d) {
      tooltip.transition().duration(200).style("opacity", 0);
    };

    let bubbleRadius = "pop";
    let positionEnY = 0;
    let positionEnX = 1;
    let nombremax = 0;

    const createCig1992 = (isActive) => {
      svg.selectAll(".chart").remove();
      positionEnY = 0;
      positionEnX = 1;
      const nb_cig = dataCigarettes.map(function (d) {
        return d["Nb cigarette fumé sur l'année"];
      });
      nombremax = Math.round(nb_cig[0] / 100000000);

      for (let index = 0; index < nombremax; index++) {
        // console.log(index);
        // console.log(positionEnY);

        const lineChart = svg
          .append("g")
          .attr("class", "chart")
          .append("rect")
          .attr("fill", "black")
          .transition()
          .duration(1000)
          .attr("x", positionEnX * 30)
          .attr("y", positionEnY)
          .attr("width", 10)
          .attr("height", 50);

        if (isActive && index >= nombremax - 23) {
          lineChart.attr("fill", "#bfbfbf");
        }

        if (positionEnX === 20) positionEnX = 0;
        if (index === 19) {
          positionEnY = 60;
        }

        if (positionEnX === 40) positionEnX = 0;
        if (index === 39) {
          positionEnY = 120;
        }
        if (positionEnX === 60) positionEnX = 0;
        if (index === 59) {
          positionEnY = 180;
        }
        if (positionEnX === 80) positionEnX = 0;
        if (index === 79) {
          positionEnY = 240;
        }
        if (positionEnX === 100) positionEnX = 0;
        if (index === 99) {
          positionEnY = 300;
        }
        if (positionEnX === 120) positionEnX = 0;
        if (index === 119) {
          positionEnY = 360;
        }

        positionEnX++;
      }
    };

    const createCig2017 = () => {
      positionEnY = 0;
      positionEnX = 1;

      svg.selectAll(".chart").remove();
      const nb_cig = dataCigarettes.map(function (d) {
        return d["Nb cigarette fumé sur l'année"];
      });
      nombremax = Math.round(nb_cig[25] / 100000000);

      for (let index = 0; index < nombremax; index++) {
        // console.log(index);
        // console.log(positionEnY);

        const lineChart = svg
          .append("g")
          .attr("class", "chart")
          .append("rect")
          .transition()
          .duration(1000)
          .attr("fill", "black")

          .attr("x", positionEnX * 30)
          .attr("y", positionEnY)
          .attr("width", 10)
          .attr("height", 50);

        if (positionEnX === 20) positionEnX = 0;
        if (index === 19) {
          positionEnY = 60;
        }

        if (positionEnX === 40) positionEnX = 0;
        if (index === 39) {
          positionEnY = 120;
        }
        if (positionEnX === 60) positionEnX = 0;
        if (index === 59) {
          positionEnY = 180;
        }
        if (positionEnX === 80) positionEnX = 0;
        if (index === 79) {
          positionEnY = 240;
        }
        if (positionEnX === 100) positionEnX = 0;
        if (index === 99) {
          positionEnY = 300;
        }
        if (positionEnX === 120) positionEnX = 0;
        if (index === 119) {
          positionEnY = 360;
        }

        positionEnX++;
      }
    };
    // various functions to update chart elements

    function doNombreStepUn() {
      createCig1992(false);
    }
    function reverseStepUn() {
      createCig1992(false);

      var xAxis = d3.axisBottom().scale(x);
      x.domain([0, 1000000]);

      svg
        .selectAll(".Xaxis")
        .attr("transform", `translate(0,230)`)
        .transition()
        .duration(1000)
        .call(xAxis);
    }

    function createPitiBaton() {
      svg
        .append("g")
        .lower()
        .attr("class", "chart")
        .append("rect")
        .transition()
        .duration(1000)
        .attr("transform", `rotate(90)`)
        .attr("fill", "#bfbfbf")
        .attr("x", 200)
        .attr("y", -533.2734) //nombreKm = ((600 / 10) * nb_km[0]/100000);
        .attr("width", 10)
        .attr("height", 533.2734);
    }

    function doKmStepDeux() {
      // let nombreKM = 0;
      // const nb_km = dataCigarettes.map(function (d) {
      //   return d["Longeur en KM du nombre de cigarette fumée sur l'année"];
      // });
      // console.log((600 / 10) * nb_km[0]/100000);
      //
      svg
        .selectAll(".chart rect")
        .transition()
        .duration(1000)
        .attr("transform", `rotate(90)`)
        .attr("x", 200)
        .attr("y", -533.2734) //nombreKm = ((600 / 10) * nb_km[0]/100000);
        .attr("width", 10)
        .attr("height", 533.2734);

      var xAxis = d3.axisBottom().scale(x);
      x.domain([0, 1000000]);

      svg
        .selectAll(".Xaxis")
        .attr("transform", `translate(0,230)`)
        .transition()
        .duration(1000)
        .call(xAxis);

      // const nb_km = dataCigarettes.map(function (d) {
      //   return d["Longeur en KM du nombre de cigarette fumée sur l'année"];
      // });
      // nombreKM = nb_km[0];
      // console.log(nombreKM);
      // var d1 = document.getElementById("avicii_viz");
      // d1.insertAdjacentHTML("afterend", '<div id="two">two</div>');
    }

    function reverseStepDeux() {
      svg
        .selectAll(".chart rect")
        .transition()
        .duration(1000)
        .attr("x", 200)
        .attr("y", -533.2734)
        .attr("width", 10)
        .attr("height", 533.2734);

      var xAxis = d3.axisBottom().scale(x);
      x.domain([0, 1000000]);

      svg
        .selectAll(".Xaxis")
        .attr("transform", `translate(0,230)`)
        .transition()
        .duration(1000)
        .call(xAxis);
    }

    function doPoidsStepTrois() {
      svg
        .select(".poids-texte")
        .transition()
        .duration(1000)
        .style("opacity", 1);

      svg
        .selectAll(".chart rect")
        .transition()
        .duration(1000)
        .attr("x", -10)
        .attr("y", -670)
        .attr("width", 10)
        .attr("height", 670);

      const svgCode =
        '<svg width="174" height="126" viewBox="0 0 174 126" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M110.727 47.25H153.357L127.02 15.75H110.727V47.25ZM130.5 114.188C133.585 114.188 136.353 113.164 138.725 110.801C141.098 108.439 142.364 105.683 142.364 102.375C142.364 99.3037 141.098 96.5475 138.725 94.185C136.353 91.8225 133.585 90.5625 130.5 90.5625C127.178 90.5625 124.41 91.8225 122.037 94.185C119.665 96.5475 118.636 99.3037 118.636 102.375C118.636 105.683 119.665 108.439 122.037 110.801C124.41 113.164 127.178 114.188 130.5 114.188ZM39.5455 114.188C43.0255 114.188 45.8727 113.164 48.0873 110.801C50.3018 108.439 51.4091 105.683 51.4091 102.375C51.4091 99.3037 50.3018 96.5475 48.0873 94.185C45.8727 91.8225 43.0255 90.5625 39.5455 90.5625C36.0655 90.5625 33.2182 91.8225 31.0036 94.185C28.7891 96.5475 27.6818 99.3037 27.6818 102.375C27.6818 105.683 28.7891 108.439 31.0036 110.801C33.2182 113.164 36.0655 114.188 39.5455 114.188ZM134.455 0L174 47.25V102.375H154.227C154.227 108.911 151.775 114.424 147.03 119.149C142.364 123.795 136.827 126 130.5 126C123.935 126 118.399 123.795 113.733 119.149C108.987 114.424 106.773 108.911 106.773 102.375H63.2727C63.2727 108.911 60.9 114.424 56.2336 119.149C51.4091 123.795 45.9518 126 39.5455 126C33.1391 126 27.6818 123.795 22.8573 119.149C18.1909 114.424 15.8182 108.911 15.8182 102.375H0V70.875H64.7755L15.8182 32.3662V55.125H0V7.875H7.90909L94.9091 55.5975V0H134.455Z" fill="black"/>' +
        "</svg>";
      const myDiv = document.getElementById("camion");
      myDiv.innerHTML = svgCode;

      const circle = document.querySelector("svg path");
      const duration = 1000; // durée de l'animation en millisecondes
      const startX = -400; // position de départ (hors de l'écran)
      const endX = 0; // position d'arrivée
      const easing = "easeInOutQuad"; // type d'animation

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1); // pourcentage d'avancement (max 1)

        // position en X calculée en fonction du pourcentage d'avancement
        const x = startX + percentage * (endX - startX);
        circle.setAttribute("transform", `translate(${x}, 0)`);

        if (percentage < 1) {
          // continuer l'animation tant que le pourcentage d'avancement est inférieur à 1
          requestAnimationFrame(animate);
        }
      };

      let startTime = null;
      requestAnimationFrame(animate);

      var yAxis = d3
        .axisLeft()
        .scale(y)
        .tickFormat((d) => d + "%");
      y.domain([100, 0]);

      svg
        .selectAll(".Yaxis")
        .transition()
        .duration(500)
        .attr("transform", `translate(30,1000)`)
        .call(yAxis);

      svg
        .append("text")
        .attr("class", "Yaxis-label")
        .attr("transform", `translate(-100,${height / 2}) rotate(-90)`)
        .style("text-anchor", "middle")
        .style("opacity", 0)
        .text("Pourcentage de fumeurs passifs");
    }
    function reverseStepTrois() {
      svg
        .selectAll(".poids-texte")
        .transition()
        .duration(1000)
        .style("opacity", 0);

      const svgCode =
        '<svg width="174" height="126" viewBox="0 0 174 126" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M110.727 47.25H153.357L127.02 15.75H110.727V47.25ZM130.5 114.188C133.585 114.188 136.353 113.164 138.725 110.801C141.098 108.439 142.364 105.683 142.364 102.375C142.364 99.3037 141.098 96.5475 138.725 94.185C136.353 91.8225 133.585 90.5625 130.5 90.5625C127.178 90.5625 124.41 91.8225 122.037 94.185C119.665 96.5475 118.636 99.3037 118.636 102.375C118.636 105.683 119.665 108.439 122.037 110.801C124.41 113.164 127.178 114.188 130.5 114.188ZM39.5455 114.188C43.0255 114.188 45.8727 113.164 48.0873 110.801C50.3018 108.439 51.4091 105.683 51.4091 102.375C51.4091 99.3037 50.3018 96.5475 48.0873 94.185C45.8727 91.8225 43.0255 90.5625 39.5455 90.5625C36.0655 90.5625 33.2182 91.8225 31.0036 94.185C28.7891 96.5475 27.6818 99.3037 27.6818 102.375C27.6818 105.683 28.7891 108.439 31.0036 110.801C33.2182 113.164 36.0655 114.188 39.5455 114.188ZM134.455 0L174 47.25V102.375H154.227C154.227 108.911 151.775 114.424 147.03 119.149C142.364 123.795 136.827 126 130.5 126C123.935 126 118.399 123.795 113.733 119.149C108.987 114.424 106.773 108.911 106.773 102.375H63.2727C63.2727 108.911 60.9 114.424 56.2336 119.149C51.4091 123.795 45.9518 126 39.5455 126C33.1391 126 27.6818 123.795 22.8573 119.149C18.1909 114.424 15.8182 108.911 15.8182 102.375H0V70.875H64.7755L15.8182 32.3662V55.125H0V7.875H7.90909L94.9091 55.5975V0H134.455Z" fill="black"/>' +
        "</svg>";
      const myDiv = document.getElementById("camion");
      myDiv.innerHTML = svgCode;

      const circle = document.querySelector("svg path");
      const duration = 1000; // durée de l'animation en millisecondes
      const startX = 0; // position de départ (hors de l'écran)
      const endX = 400; // position d'arrivée
      const easing = "easeInOutQuad"; // type d'animation

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1); // pourcentage d'avancement (max 1)

        // position en X calculée en fonction du pourcentage d'avancement
        const x = startX + percentage * (endX - startX);
        circle.setAttribute("transform", `translate(${x}, 0)`);

        if (percentage < 1) {
          // continuer l'animation tant que le pourcentage d'avancement est inférieur à 1
          requestAnimationFrame(animate);
        }
      };

      let startTime = null;
      requestAnimationFrame(animate);
    }

    function doLoiTabac() {
      svg
        .selectAll(".poids-texte")
        .transition()
        .duration(1000)
        .style("opacity", 0);

      var yAxis = d3
        .axisLeft()
        .scale(y)
        .tickFormat((d) => d + "%");
      y.domain([100, 0]);

      svg.selectAll(".Yaxis").attr("transform", `translate(30,10)`).call(yAxis);

      // Sélectionner l'élément où les rectangles seront créés

      svg
        .selectAll(".chart rect")
        .attr("transform", `rotate(90)`)
        .transition()
        .duration(1000)
        .attr("x", 247.1)
        .attr("y", -650)
        .attr("width", 152.1)
        .attr("height", 600);

      //-----------------------------------------//

      const svgCode =
        '<svg width="174" height="126" viewBox="0 0 174 126" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M110.727 47.25H153.357L127.02 15.75H110.727V47.25ZM130.5 114.188C133.585 114.188 136.353 113.164 138.725 110.801C141.098 108.439 142.364 105.683 142.364 102.375C142.364 99.3037 141.098 96.5475 138.725 94.185C136.353 91.8225 133.585 90.5625 130.5 90.5625C127.178 90.5625 124.41 91.8225 122.037 94.185C119.665 96.5475 118.636 99.3037 118.636 102.375C118.636 105.683 119.665 108.439 122.037 110.801C124.41 113.164 127.178 114.188 130.5 114.188ZM39.5455 114.188C43.0255 114.188 45.8727 113.164 48.0873 110.801C50.3018 108.439 51.4091 105.683 51.4091 102.375C51.4091 99.3037 50.3018 96.5475 48.0873 94.185C45.8727 91.8225 43.0255 90.5625 39.5455 90.5625C36.0655 90.5625 33.2182 91.8225 31.0036 94.185C28.7891 96.5475 27.6818 99.3037 27.6818 102.375C27.6818 105.683 28.7891 108.439 31.0036 110.801C33.2182 113.164 36.0655 114.188 39.5455 114.188ZM134.455 0L174 47.25V102.375H154.227C154.227 108.911 151.775 114.424 147.03 119.149C142.364 123.795 136.827 126 130.5 126C123.935 126 118.399 123.795 113.733 119.149C108.987 114.424 106.773 108.911 106.773 102.375H63.2727C63.2727 108.911 60.9 114.424 56.2336 119.149C51.4091 123.795 45.9518 126 39.5455 126C33.1391 126 27.6818 123.795 22.8573 119.149C18.1909 114.424 15.8182 108.911 15.8182 102.375H0V70.875H64.7755L15.8182 32.3662V55.125H0V7.875H7.90909L94.9091 55.5975V0H134.455Z" fill="black"/>' +
        "</svg>";
      const myDiv = document.getElementById("camion");
      myDiv.innerHTML = svgCode;

      const circle = document.querySelector("svg path");
      const duration = 1000; // durée de l'animation en millisecondes
      const startX = 0; // position de départ (hors de l'écran)
      const endX = 400; // position d'arrivée
      const easing = "easeInOutQuad"; // type d'animation

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1); // pourcentage d'avancement (max 1)

        // position en X calculée en fonction du pourcentage d'avancement
        const x = startX + percentage * (endX - startX);
        circle.setAttribute("transform", `translate(${x}, 0)`);

        if (percentage < 1) {
          // continuer l'animation tant que le pourcentage d'avancement est inférieur à 1
          requestAnimationFrame(animate);
        }
      };

      let startTime = null;
      requestAnimationFrame(animate);
    }

    function reverseStepLoi() {
      // Sélectionner l'élément où les rectangles seront créés

      svg
        .selectAll(".chart rect")
        .attr("transform", `rotate(90)`)
        .transition()
        .duration(1000)
        .attr("x", 247.1)
        .attr("y", -650)
        .attr("width", 152.1)
        .attr("height", 600);
    }

    function doLoiTabacDeux() {
      // Sélectionner l'élément où les rectangles seront créés

      svg
        .selectAll(".chart rect")
        .transition()
        .duration(1000)
        .attr("transform", `rotate(90)`)
        .attr("x", 364.9)
        .attr("y", -650)
        .attr("width", 35.1)
        .attr("height", 600);
    }
    function reverseLoiTabacDeux() {
      var yAxis = d3
        .axisLeft()
        .scale(y)
        .tickFormat((d) => d + "%");
      y.domain([100, 0]);

      svg
        .selectAll(".Yaxis")
        .transition()
        .duration(1000)
        .attr("transform", `translate(30,10)`)
        .call(yAxis);

      svg
        .selectAll(".chart rect")
        .transition()
        .duration(1000)
        .attr("transform", `rotate(90)`)
        .attr("x", 364.9)
        .attr("y", -650)
        .attr("width", 35.1)
        .attr("height", 600)
        .attr("fill", "black");
    }

    //--------------------//
    let positionEnYToday = 0;
    let positionEnXToday = 1;
    let nombremaxToday = 0;
    function doNombreStepToday() {
      createCig1992(true);
    }
    function reverseNombreStepToday() {
      createCig1992(true);
      var yAxis = d3
        .axisLeft()
        .scale(y)
        .tickFormat((d) => d + "%");
      y.domain([100, 0]);

      svg
        .selectAll(".Yaxis")
        .transition()
        .duration(1000)
        .attr("transform", `translate(30,10)`)
        .call(yAxis);
    }

    function doKMStepToday() {
      svg
        .selectAll(".chart rect")
        .transition()
        .duration(1000)
        .attr("transform", `rotate(90)`)
        .attr("x", 200)
        .attr("y", -434.0080014) //nombreKm = ((600 / 10) * nb_km[0]/100000);
        .attr("width", 10)
        .attr("height", 434.0080014)
        .attr("fill", "black");
    }
    function reverseKMToday() {}
    function doPoidsStepToday() {
      '<svg width="174" height="126" viewBox="0 0 174 126" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M110.727 47.25H153.357L127.02 15.75H110.727V47.25ZM130.5 114.188C133.585 114.188 136.353 113.164 138.725 110.801C141.098 108.439 142.364 105.683 142.364 102.375C142.364 99.3037 141.098 96.5475 138.725 94.185C136.353 91.8225 133.585 90.5625 130.5 90.5625C127.178 90.5625 124.41 91.8225 122.037 94.185C119.665 96.5475 118.636 99.3037 118.636 102.375C118.636 105.683 119.665 108.439 122.037 110.801C124.41 113.164 127.178 114.188 130.5 114.188ZM39.5455 114.188C43.0255 114.188 45.8727 113.164 48.0873 110.801C50.3018 108.439 51.4091 105.683 51.4091 102.375C51.4091 99.3037 50.3018 96.5475 48.0873 94.185C45.8727 91.8225 43.0255 90.5625 39.5455 90.5625C36.0655 90.5625 33.2182 91.8225 31.0036 94.185C28.7891 96.5475 27.6818 99.3037 27.6818 102.375C27.6818 105.683 28.7891 108.439 31.0036 110.801C33.2182 113.164 36.0655 114.188 39.5455 114.188ZM134.455 0L174 47.25V102.375H154.227C154.227 108.911 151.775 114.424 147.03 119.149C142.364 123.795 136.827 126 130.5 126C123.935 126 118.399 123.795 113.733 119.149C108.987 114.424 106.773 108.911 106.773 102.375H63.2727C63.2727 108.911 60.9 114.424 56.2336 119.149C51.4091 123.795 45.9518 126 39.5455 126C33.1391 126 27.6818 123.795 22.8573 119.149C18.1909 114.424 15.8182 108.911 15.8182 102.375H0V70.875H64.7755L15.8182 32.3662V55.125H0V7.875H7.90909L94.9091 55.5975V0H134.455Z" fill="black"/>' +
        "</svg>";
      const myDiv = document.getElementById("camion");
      myDiv.innerHTML = svgCode;

      const circle = document.querySelector("svg path");
      const duration = 1000; // durée de l'animation en millisecondes
      const startX = -400; // position de départ (hors de l'écran)
      const endX = 0; // position d'arrivée
      const easing = "easeInOutQuad"; // type d'animation

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1); // pourcentage d'avancement (max 1)

        // position en X calculée en fonction du pourcentage d'avancement
        const x = startX + percentage * (endX - startX);
        circle.setAttribute("transform", `translate(${x}, 0)`);

        if (percentage < 1) {
          // continuer l'animation tant que le pourcentage d'avancement est inférieur à 1
          requestAnimationFrame(animate);
        }
      };

      let startTime = null;
      requestAnimationFrame(animate);
    }
    function reversePoidsToday() {
      svg
        .selectAll(".poids-texteDeux")
        .transition()
        .duration(1000)
        .style("opacity", 0);

      svg
        .selectAll(".chart rect")
        .transition()
        .duration(1000)
        .attr("x", 200)
        .attr("y", -434.0080014)
        .attr("width", 10)
        .attr("height", 434.0080014);

      var xAxis = d3.axisBottom().scale(x);
      x.domain([0, 1000000]);

      svg
        .selectAll(".Xaxis")
        .attr("transform", `translate(0,230)`)
        .transition()
        .duration(1000)
        .call(xAxis);
    }
    function stepFin() {
      svg
        .selectAll(".poids-texte")
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .attr("fill", "#bfbfbf");

      const svgCode =
        '<svg width="174" height="126" viewBox="0 0 174 126" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M110.727 47.25H153.357L127.02 15.75H110.727V47.25ZM130.5 114.188C133.585 114.188 136.353 113.164 138.725 110.801C141.098 108.439 142.364 105.683 142.364 102.375C142.364 99.3037 141.098 96.5475 138.725 94.185C136.353 91.8225 133.585 90.5625 130.5 90.5625C127.178 90.5625 124.41 91.8225 122.037 94.185C119.665 96.5475 118.636 99.3037 118.636 102.375C118.636 105.683 119.665 108.439 122.037 110.801C124.41 113.164 127.178 114.188 130.5 114.188ZM39.5455 114.188C43.0255 114.188 45.8727 113.164 48.0873 110.801C50.3018 108.439 51.4091 105.683 51.4091 102.375C51.4091 99.3037 50.3018 96.5475 48.0873 94.185C45.8727 91.8225 43.0255 90.5625 39.5455 90.5625C36.0655 90.5625 33.2182 91.8225 31.0036 94.185C28.7891 96.5475 27.6818 99.3037 27.6818 102.375C27.6818 105.683 28.7891 108.439 31.0036 110.801C33.2182 113.164 36.0655 114.188 39.5455 114.188ZM134.455 0L174 47.25V102.375H154.227C154.227 108.911 151.775 114.424 147.03 119.149C142.364 123.795 136.827 126 130.5 126C123.935 126 118.399 123.795 113.733 119.149C108.987 114.424 106.773 108.911 106.773 102.375H63.2727C63.2727 108.911 60.9 114.424 56.2336 119.149C51.4091 123.795 45.9518 126 39.5455 126C33.1391 126 27.6818 123.795 22.8573 119.149C18.1909 114.424 15.8182 108.911 15.8182 102.375H0V70.875H64.7755L15.8182 32.3662V55.125H0V7.875H7.90909L94.9091 55.5975V0H134.455Z" fill="black"/>' +
        "</svg>";
      const myDiv = document.getElementById("camion");
      myDiv.innerHTML = svgCode;

      const circle = document.querySelector("svg path");
      const duration = 1000; // durée de l'animation en millisecondes
      const startX = 0; // position de départ (hors de l'écran)
      const endX = 400; // position d'arrivée
      const easing = "easeInOutQuad"; // type d'animation

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1); // pourcentage d'avancement (max 1)

        // position en X calculée en fonction du pourcentage d'avancement
        const x = startX + percentage * (endX - startX);
        circle.setAttribute("transform", `translate(${x}, 0)`);

        if (percentage < 1) {
          // continuer l'animation tant que le pourcentage d'avancement est inférieur à 1
          requestAnimationFrame(animate);
        }
      };

      let startTime = null;
      requestAnimationFrame(animate);
    }
    function functionTexte() {
      var textNode = svg
        .append("text")
        .style("opacity", 1)
        .transition()
        .duration(1000)
        .attr("class", "poids-texteDeux")
        .attr("x", 100)
        .attr("y", height / 2.8)
        .text("211 X");
    }
    function toggleAxesOpacity(toggleX, toggleY, opacity) {
      if (toggleX) {
        svg
          .selectAll(".Xaxis")
          .transition()
          .duration(1000)
          .style("opacity", opacity);

        svg
          .selectAll(".Xaxis-label")
          .transition()
          .duration(1000)
          .style("opacity", opacity);
      }

      if (toggleY) {
        svg
          .selectAll(".Yaxis")
          .transition()
          .duration(1000)
          .style("opacity", opacity);

        svg
          .selectAll(".Yaxis-label")
          .transition()
          .duration(1000)
          .style("opacity", opacity);
      }
    }

    function drawStraightPath() {
      if (typeof line === "undefined") {
        var path = d3.path();

        for (var item = 0; item < data.length; item++) {
          let x_value = data[item].score;
          let y_value = data[item].magnitude;
          if (item === 0) {
            path.moveTo(x(x_value), y(y_value));
          } else {
            path.lineTo(x(x_value), y(y_value));
          }
        }

        window.line = d3
          .select(".chart")
          .append("path")
          .attr("class", "straight")
          .attr("d", path);

        window.totalLength = line.node().getTotalLength();
      }

      line
        .attr("stroke", "#F2E8DC")
        .attr("fill", "none")
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(3000)
        .attr("stroke-dashoffset", 0);
    }

    function hideStraightPath() {
      line
        .transition()
        .duration(3000)
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength);
    }

    function toggleElementOpacity(element, opacity) {
      element.transition().duration(1000).style("opacity", opacity);
    }

    function drawBezierPath() {
      if (typeof lineBezier === "undefined") {
        var pathBezier = d3.path();

        for (var item = 0; item < bezierData.length; item++) {
          let currenItem = bezierData[item];

          if (item === 0) {
            pathBezier.moveTo(x(currenItem[0]), y(currenItem[1]));
          }

          pathBezier.bezierCurveTo(
            x(currenItem[2]),
            y(currenItem[3]),
            x(currenItem[4]),
            y(currenItem[5]),
            x(currenItem[6]),
            y(currenItem[7])
          );
        }

        window.lineBezier = d3
          .select(".chart")
          .append("path")
          .attr("class", "bezier")
          .attr("stroke-width", "2px")
          .attr("d", pathBezier);

        window.totalLengthBezier = lineBezier.node().getTotalLength();
      }

      lineBezier
        .attr("stroke", "#F2E8DC")
        .attr("fill", "none")
        .attr("stroke-dasharray", totalLengthBezier + " " + totalLengthBezier)
        .attr("stroke-dashoffset", totalLengthBezier)
        .transition()
        .duration(3000)
        .attr("stroke-dashoffset", 0);
    }

    function hideBezierPath() {
      lineBezier
        .attr("fill", "none")
        .transition()
        .duration(3000)
        .attr("stroke-dasharray", totalLengthBezier + " " + totalLengthBezier)
        .attr("stroke-dashoffset", totalLengthBezier);
    }

    // using d3 for convenience
    var main = d3.select("main");
    var scrolly = main.select("#scrolly");
    var figure = scrolly.select("figure");
    var article = scrolly.select("article");
    var step = article.selectAll(".step");

    // initialize the scrollama
    var scroller = scrollama();

    // generic window resize listener event
    function handleResize() {
      // 1. update height of step elements
      var stepH = Math.floor(window.innerHeight * 0.75);
      step.style("height", stepH + "px");
      step.style("width", "250px");

      var figureHeight = window.innerHeight / 2;
      var figureMarginTop = (window.innerHeight - figureHeight) / 2;

      figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

      // 3. tell scrollama to update new element dimensions
      scroller.resize();
    }

    // scrollama event handlers

    var toolTipState = "title";

    /*
scrollama magic happens here:
- based on the index, trigger a certiain function from d3-animations.js
- sometimes only fire an event when going down or up in the story
*/
    function handleStepEnter(response) {
      // response = { element, direction, index }
      let currentIndex = response.index;
      let currentDirection = response.direction;

      // add color to current step only
      step.classed("is-active", function (d, i) {
        return i === currentIndex;
      });

      // update graphic based on step
      switch (currentIndex) {
        case 0:
          toolTipState = "title";
          if (currentDirection === "up") {
            //d3.selectAll(".chart").remove();
            reverseStepUn();
            toggleAxesOpacity(true, false, 0);
          } else {
            doNombreStepUn();
          }
          break;
        case 1:
          toolTipState = "title score";
          if (currentDirection === "up") {
            reverseStepDeux();
            reverseStepTrois();
            toggleAxesOpacity(true, false, 1);
          } else {
            doKmStepDeux();
            toggleAxesOpacity(true, false, 1);
          }
          break;
        case 2:
          toolTipState = "title score magnitude";
          if (currentDirection === "up") {
            doPoidsStepTrois();
            toggleAxesOpacity(false, true, 0);
          } else {
            doPoidsStepTrois();

            toggleAxesOpacity(true, false, 0);
          }
          break;
        case 3:
          if (currentDirection === "up") {
            toggleAxesOpacity(false, false, 0);
            svg.select(".poids-texte").attr("fill", "black");
            reverseStepLoi();
          } else {
            doLoiTabac();
            toggleAxesOpacity(false, true, 1);
          }
          break;
        case 4:
          if (currentDirection === "up") {
            reverseLoiTabacDeux();
            toggleAxesOpacity(false, true, 1);
          } else {
            doLoiTabacDeux();
            toggleAxesOpacity(false, true, 1);
          }
          break;
        case 5:
          if (currentDirection === "up") {
            toggleAxesOpacity(true, false, 0);
            reverseNombreStepToday();
          } else {
            doNombreStepToday();
            toggleAxesOpacity(false, true, 0);
          }
          break;
        case 6:
          if (currentDirection === "up") {
            reverseKMToday();
            reversePoidsToday();
            reverseStepTrois();
            createPitiBaton();
            toggleAxesOpacity(true, false, 1);
          } else {
            doKMStepToday();
            createPitiBaton();
            toggleAxesOpacity(true, false, 1);
          }
          break;
        case 7:
          if (currentDirection === "up") {
            toggleAxesOpacity(true, false, 1);
            doPoidsStepTrois();
          } else {
            toggleAxesOpacity(true, true, 0);
            functionTexte();
            doPoidsStepTrois();
            svg.select(".poids-texte").attr("fill", "#bfbfbf");
          }

          break;
        case 8:
          if (currentDirection === "down") {
            toggleAxesOpacity(true, true, 0);
          } else {
            stepFin();
            toggleAxesOpacity(true, true, 0);
          }
          break;
        default:
          break;
      }
    }

    function setupStickyfill() {
      d3.selectAll(".sticky").each(function () {
        Stickyfill.add(this);
      });
    }

    function init() {
      setupStickyfill();

      // 1. force a resize on load to ensure proper dimensions are sent to scrollama
      handleResize();

      // 2. setup the scroller passing options
      // 		this will also initialize trigger observations
      // 3. bind scrollama event handlers (this can be chained like below)
      scroller
        .setup({
          step: "#scrolly article .step",
          offset: 0.5,
          debug: false,
        })
        .onStepEnter(handleStepEnter);

      // setup resize event
      window.addEventListener("resize", handleResize);
    }

    // kick things off
    init();
  })
  .catch(function (error) {});
