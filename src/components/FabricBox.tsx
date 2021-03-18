import { fabric } from "fabric";
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react";
import React from "react";

const newText = () =>
  new fabric.IText("길벗체", {
    left: Math.random() * 100,
    top: Math.random() * 100,
    fontFamily: "Gilbeot_Rainbow",
    fontSize: 250,
    styles: [
      [
        { fontFamily: "Gilbeot_Rainbow" },
        { fontFamily: "Gilbeot_TG" },
        { fontFamily: "Gilbeot_BI" },
      ],
    ],
  });
const defaultText = newText();
let _editor: FabricJSEditor | undefined;
const applyFont = (fontFamily: string) => () => {
  if (!_editor) return;
  const active = _editor.canvas.getActiveObject() as fabric.IText;
  if (!active) return;
  // console.log(active);
  active.setSelectionStyles({
    fontFamily,
  });
  console.log(active.toJSON().styles);
  _editor.canvas.requestRenderAll();
};

const download = () => {
  if (!_editor) return;
  const dataURL = _editor.canvas.toDataURL({
    format: "png",
  });
  const downloadLink = window.document.createElement("a");
  downloadLink.setAttribute("download", "gilbeot.png");
  downloadLink.setAttribute("href", dataURL);
  downloadLink.click();
  _editor.canvas.requestRenderAll();
};
const iTextAddHandler = () => {
  if (!_editor) return;
  _editor.canvas.add(newText());
};
export default function FabricBox() {
  const [[width, height], setSize] = React.useState([800, 400]);
  const { editor, onReady } = useFabricJSEditor();
  _editor = editor;

  const addDefaultReady = React.useCallback((c: fabric.Canvas) => {
    onReady(c);
    c.setDimensions({ width, height });
    window.document.fonts.ready.then((res) => c.add(defaultText));
    window.addEventListener("keydown", (ev) => {
      console.log(ev.code);
      if (ev.code === "Delete") {
        const active = c.getActiveObject() as fabric.IText;
        if (!active || active?.isEditing) return;
        c.remove(active);
        c.requestRenderAll();
      }
    });
    c.requestRenderAll();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    editor?.canvas.setDimensions({ width, height });
    // eslint-disable-next-line
  }, [width, height]);
  //   console.log(editor);
  //   if (!editor) return null;

  return (
    <section>
      <div>
        width:
        <input
          type="number"
          value={width}
          onChange={(ev) => setSize([Number(ev.target.value), height])}
        />
      </div>
      <div>
        height:
        <input
          type="number"
          value={height}
          onChange={(ev) => setSize([width, Number(ev.target.value)])}
        />
      </div>
      <div>
        <button onClick={iTextAddHandler}>Add New</button>
        <button onClick={download}>Download PNG</button>
      </div>
      <FabricJSCanvas onReady={addDefaultReady} />
      <div>
        <button onClick={applyFont("Gilbeot_BI")}>apply BI</button>
        <button onClick={applyFont("Gilbeot_Rainbow")}>apply Rainbow</button>
        <button onClick={applyFont("Gilbeot_TG")}>apply TG</button>
      </div>
    </section>
  );
}
