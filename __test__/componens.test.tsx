import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "../src/components/common/Button";
import ItemBox from "../src/components/common/ItemBox";
import ItemBoxSelect from "../src/components/common/ItemBoxSelect";

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

describe("ItemBox component", () => {
  const onClick = jest.fn();
  mountTest(() => <ItemBox text="hello" onClick={onClick} />);

  it("renders correctly", () => {
    const { container } = render(<ItemBox text="hello" onClick={onClick} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should not clickable when disabled", () => {
    const { container } = render(
      <ItemBox text="hello" onClick={onClick} disabled={true} />
    );
    fireEvent.click(container.firstChild as HTMLElement);
    expect(onClick).not.toHaveBeenCalledWith();
    expect(container.firstChild).toHaveClass("disabled");
  });
});

describe("ItemBoxSelect component", () => {
  const onSelect = jest.fn();

  mountTest(() => (
    <ItemBoxSelect values={["1", "2", "3"]} onSelect={onSelect} />
  ));

  it("renders correctly", () => {
    const { container } = render(
      <ItemBoxSelect values={["1", "2", "3"]} onSelect={onSelect} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should not clickable when disabled", () => {
    const { container } = render(
      <ItemBoxSelect
        values={["1", "2", "3"]}
        onSelect={onSelect}
        disabled={true}
      />
    );
    fireEvent.click(container.firstChild as HTMLElement);
    expect(onSelect).not.toHaveBeenCalledWith();
    expect(container.firstChild?.firstChild).toHaveClass("disabled");
  });

  function toggleOpen(container: HTMLElement) {
    fireEvent.click(
      container.querySelector(".item-box-dropdown-wrapper") as HTMLElement
    );
  }

  it("should open and close when click", () => {
    const { container } = render(
      <ItemBoxSelect values={["1", "2", "3"]} onSelect={onSelect} />
    );
    toggleOpen(container);
    expect(container.firstChild?.firstChild).toHaveClass("active");
    expect(container.querySelector(".dropdown-content")).toBeInTheDocument();
    toggleOpen(container);
    expect(container.firstChild?.firstChild).not.toHaveClass("active");
    expect(
      container.querySelector(".dropdown-content")
    ).not.toBeInTheDocument();
  });

  it("should render options correctly", () => {
    const { container } = render(
      <ItemBoxSelect values={["1", "2", "3"]} onSelect={onSelect} />
    );
    toggleOpen(container);
    expect(container.querySelectorAll(".dropdown-option").length).toBe(3);
  });

  it('should choose option when click "1"', () => {
    const { container } = render(
      <ItemBoxSelect values={["1", "2", "3"]} onSelect={onSelect} />
    );
    toggleOpen(container);
    fireEvent.click(
      container.querySelector(".dropdown-option")?.firstChild as HTMLElement
    );
    expect(onSelect).toHaveBeenCalledWith("1");
  });

  it("should close when click outside", () => {
    const { container } = render(
      <ItemBoxSelect values={["1", "2", "3"]} onSelect={onSelect} />
    );
    toggleOpen(container);
    fireEvent.mouseDown(document);
    expect(container.firstChild?.firstChild).not.toHaveClass("active");
    expect(
      container.querySelector(".dropdown-content")
    ).not.toBeInTheDocument();
  });
});
