import * as d3 from "d3";
import versor from "versor";
window.d3 = d3;

const zoom = (projection, path, svg) => {
  window.svg = svg;
  let v0; // Mouse position in Cartesian coordinates at start of drag gesture.
  let r0; // Projection rotation as Euler angles at start.
  let q0; // Projection rotation as versor at start.
  const zoomstarted = () => {
    v0 = versor.cartesian(projection.invert(d3.mouse(svg)));
    r0 = projection.rotate();
    q0 = versor(r0);
  };
  const zoomed = () => {
    projection.scale((d3.event.transform.k * (svg.clientHeight - 10)) / 10);

    var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(svg))),
      q1 = versor.multiply(q0, versor.delta(v0, v1)),
      r1 = versor.rotation(q1);
    projection.rotate(r1);

    // d3.select(svg)
    //   .selectAll("path")
    //   .each(
    //     (_, i, nodes) =>
    //       nodes[i].__vue__ &&
    //       nodes[i].attributes.d &&
    //       d3
    //         .select(nodes[i])
    //         .attr("d", (_, i, nodes) => path(nodes[i].__vue__.geography))
    //   );
  };
  return d3
    .zoom()
    .scaleExtent([2, 10])
    .on("start", zoomstarted)
    .on("zoom", zoomed);
};

const drag = (projection, path, svg) => {
  let v0; // Mouse position in Cartesian coordinates at start of drag gesture.
  let r0; // Projection rotation as Euler angles at start.
  let q0; // Projection rotation as versor at start.
  const dragstarted = () => {
    const [x, y] = projection.invert(d3.mouse(svg));
    v0 = versor.cartesian([x, y]);
    r0 = projection.rotate();
    q0 = versor(r0);
    d3.select(svg)
      .selectAll(".point")
      .remove();
    d3.select(svg)
      .insert("path")
      .datum({ type: "Point", coordinates: [x, y] })
      .attr("class", "point");
    // .attr("d", (d, i, nodes) => path(nodes[i].__vue__.geography));
  };
  const dragged = () => {
    const [x, y] = projection.invert(d3.mouse(svg));
    var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(svg))),
      q1 = versor.multiply(q0, versor.delta(v0, v1)),
      r1 = versor.rotation(q1);
    projection.rotate(r1);

    d3.select(svg)
      .selectAll(".point")
      .datum({ type: "Point", coordinates: [x, y] });
    d3.select(svg)
      .selectAll("path")
      .each(
        (_, i, nodes) =>
          nodes[i].__vue__ &&
          nodes[i].attributes.d &&
          nodes[i].__vue__.geography &&
          d3
            .select(nodes[i])
            .attr("d", (_, i, nodes) => path(nodes[i].__vue__.geography))
      );
  };
  const dragended = () => {
    //emit("coord", coord.value, dragended.value);
  };
  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

export { zoom, drag };
