# @justkits/headless-ui

스타일 없이 접근성과 동작만 갖춘 헤드리스 UI 컴포넌트 라이브러리다. 스타일은 사용하는 팀이 자유롭게 입힌다.

## Requirements

- React 19 이상

## Installation

```sh
pnpm add @justkits/headless-ui
```

---

## Components

| 컴포넌트  | 상태   | 문서                                 |
| --------- | ------ | ------------------------------------ |
| `Tooltip` | Stable | [docs/Tooltip.md](./docs/Tooltip.md) |
| `Popover` | Stable | [docs/Popover.md](./docs/Popover.md) |

---

## Quick Start

### Tooltip

```tsx
import { Tooltip } from "@justkits/headless-ui";

function Example() {
  return (
    <Tooltip>
      <Tooltip.Trigger>마우스를 올려보세요</Tooltip.Trigger>
      <Tooltip.Content>툴팁 내용</Tooltip.Content>
    </Tooltip>
  );
}
```

스타일은 `className` 또는 `style`로 `Tooltip.Content`에 직접 적용한다.

```tsx
<Tooltip.Content className="tooltip-content">
  툴팁 내용
  <Tooltip.Arrow className="tooltip-arrow" />
</Tooltip.Content>
```

### Popover

```tsx
import { Popover } from "@justkits/headless-ui";

function Example() {
  return (
    <Popover>
      <Popover.Trigger>열기</Popover.Trigger>
      <Popover.Content aria-label="사용자 메뉴">팝오버 내용</Popover.Content>
    </Popover>
  );
}
```

스타일은 `className` 또는 `style`로 `Popover.Content`에 직접 적용한다.

```tsx
<Popover.Content className="popover-content" aria-label="사용자 메뉴">
  팝오버 내용
  <Popover.Arrow className="popover-arrow" />
</Popover.Content>
```

---

## Notes

- 모든 컴포넌트는 포털 없이 DOM 트리 내에 렌더된다. `overflow: hidden` 또는 stacking context가 적용된 컨테이너 안에 배치할 경우 클리핑이 발생할 수 있다.
- `asChild` prop은 현재 지원되지 않는다. 향후 릴리즈에서 추가될 예정이다.
