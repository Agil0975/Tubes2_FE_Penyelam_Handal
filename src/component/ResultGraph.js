import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ResultGraph = ({ data }) => {
  const svgRef = useRef(null);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const nodesMap = new Map();
    const linksMap = new Map();

    data.forEach((sublist) => {
      sublist.forEach((item, index) => {
        if (!nodesMap.has(item)) {
          nodesMap.set(item, { id: item, color: colorScale(index) });
        }

        if (index > 0) {
          const source = sublist[index - 1];
          const target = item;
          const linkKey = `${source}-${target}`;

          if (!linksMap.has(linkKey)) {
            linksMap.set(linkKey, { source, target });
          }
        }
      });
    });

    const nodes = Array.from(nodesMap.values());
    const links = Array.from(linksMap.values());

    const width = 600;
    const height = 400;

    const container = svg
      .attr("width", width)
      .attr("height", height)
      .style("background", "white")
      .append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 10])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    svg.call(zoom);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    const link = container
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "gray")
      .attr("stroke-width", 2);

    const node = container
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => d.color)
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) {
              simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) {
              simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (event, d) => {
        // Open the associated link in a new tab
        window.open(d.id, "_blank");
      });

    const label = container
      .selectAll(".label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("dy", 4)
      .attr("x", 15)
      .attr("fill", "black")
      .text((d) => new URL(d.id).pathname.split("/").pop());

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x + 15).attr("y", (d) => d.y + 4);
    });

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="flex justify-center items-center h-full mb-8">
      <svg ref={svgRef} />
    </div>
  );
};

export default ResultGraph;
