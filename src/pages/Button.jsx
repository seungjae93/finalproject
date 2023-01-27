import React from "react";
import Stack from "../elements/Stack";
import Button from "../components/button/Button";

const FeatureButton = () => {
  return (
    <Stack row={false} gap={10}>
      <h1>Button</h1>
      <Stack gap={10}>
        <Button.Primary
          size="large"
          outlined
          onClick={() => window.alert("버튼을 만들어보세요")}
        >
          Large Primary Button
        </Button.Primary>
        <Button.Primary size="medium">Medium</Button.Primary>
        <Button.Primary size="small">Small</Button.Primary>
      </Stack>

      <Stack gap={10}>
        <Button.Negative
          size="large"
          outlined
          onClick={() => console.log(window.prompt("어렵나요?"))}
        >
          Large Negative Button
        </Button.Negative>
        <Button.Negative size="medium">Medium</Button.Negative>
        <Button.Negative size="small">Small</Button.Negative>
      </Stack>
    </Stack>
  );
};

export default FeatureButton;
