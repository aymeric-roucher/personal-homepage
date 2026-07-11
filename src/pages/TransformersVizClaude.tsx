import { useEffect } from "react";
import TransformerSchema from "@/components/transformers-viz-claude/TransformerSchema";

const TransformersVizClaude = () => {
  useEffect(() => {
    document.title = "The interactive Transformer";
  }, []);

  return <TransformerSchema />;
};

export default TransformersVizClaude;
