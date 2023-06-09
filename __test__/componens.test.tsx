import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "../src/components/common/Button";
import mountTest from "./shared/mountTest";

describe("Button component", () => {
  mountTest(Button);
  mountTest(() => <Button disabled={true} />);
  mountTest(() => <Button loading={true} />);

  it("renders correctly", () => {
    const { container } = render(<Button />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should not clickable when loading or disabled", () => {
    const onClick = jest.fn();
    const { container: containerLoading } = render(
      <Button loading={true} onClick={onClick} />
    );
    const { container: containerDisabled } = render(
      <Button disabled={true} onClick={onClick} />
    );
    fireEvent.click(containerLoading.firstChild as HTMLElement);
    expect(onClick).not.toHaveBeenCalledWith();

    fireEvent.click(containerDisabled.firstChild as HTMLElement);
    expect(onClick).not.toHaveBeenCalledWith();

    expect(containerDisabled.firstChild).toHaveClass("btn-disabled");
    expect(containerLoading.firstChild).toHaveClass("btn-disabled");
  });
});
