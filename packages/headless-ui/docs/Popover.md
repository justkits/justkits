# Popover

클릭으로 열고 닫을 수 있는 플로팅 콘텐츠 컴포넌트다. 트리거 요소에 anchor되어 렌더되며, 포커스 관리와 키보드 접근성을 기본으로 제공한다. 컴파운드 컴포넌트 패턴으로 구성된다.

## Feature Specification

### State Management

- [x] **제어/비제어 상태 지원**: `isOpen`, `onOpenChange` props를 제공하여 사용자가 직접 상태를 제어할 수 있도록 지원

### Interactions

- [x] **클릭 기반 토글 제어**: 마우스 클릭 이벤트로 `isOpen` 상태를 토글한다.
- [x] **외부 영역 클릭 감지**: 팝오버가 열려있을 때, 팝오버 요소와 트리거 버튼을 제외한 화면의 다른 곳을 클릭하면 팝오버가 닫힌다.
- [x] **자동 포커스 이동**: 팝오버가 열리는 순간, 내부에 있는 첫 번째 상호작용 요소로 포커스를 자동으로 이동시킨다.
- [x] **포커스 가두기**: 팝오버가 열린 상태에서 `Tab` 키를 눌렀을 때, 포커스가 팝오버 바깥으로 빠져나가지 않고 내부에서만 순환한다.
- [x] **포커스 복귀**: 팝오버가 닫히면 트리거로 포커스를 돌려준다.

### Accessibility

- [x] **ARIA 속성 자동 매핑**: 트리거 요소에 `aria-haspopup="dialog"`, 상태에 따른 `aria-expanded`, 팝오버 콘텐츠와 연결되는 `aria-controls`를 자동으로 부여한다.
- [x] **`Escape`로 닫기**: 팝오버가 열린 상태에서 `Esc` 키를 누르면 즉시 닫힌다.

### Positioning

- [x] **위치 계산**: 기본적으로 트리거 아래에 렌더하지만, 뷰포트 공간이 부족하면 위로 자동 전환하고, 좌우 위치도 보정한다.
- [ ] **Portal 지원**: 현재는 DOM 트리 내에 렌더된다 (Known Issues 참고).

---

## Structure

반드시 `Popover` 안에서 `Popover.Trigger`와 `Popover.Content`를 사용해야 한다.

| 컴포넌트          | 설명                                                           |
| ----------------- | -------------------------------------------------------------- |
| `Popover`         | 컨텍스트 프로바이더. 상태와 위치를 관리한다.                   |
| `Popover.Trigger` | 트리거 요소 (`<button>` 렌더). 클릭 시 팝오버를 열거나 닫는다. |
| `Popover.Content` | 플로팅 콘텐츠 (`<dialog>` 렌더). 열린 상태에서만 렌더된다.     |
| `Popover.Arrow`   | 방향 화살표. `Popover.Content` 안에서 선택적으로 사용한다.     |

```tsx
<Popover>
  <Popover.Trigger>열기</Popover.Trigger>
  <Popover.Content aria-label="사용자 메뉴">
    팝오버 내용
    <Popover.Arrow />
  </Popover.Content>
</Popover>
```

---

## Props

### `Popover`

| Prop           | 타입                      | 기본값 | 설명                                                                         |
| -------------- | ------------------------- | ------ | ---------------------------------------------------------------------------- |
| `isOpen`       | `boolean`                 | —      | 제어 모드에서 외부에서 열림 상태를 지정한다. `onOpenChange`와 함께 사용한다. |
| `onOpenChange` | `(open: boolean) => void` | —      | 상태가 변경될 때 호출되는 콜백. `isOpen`과 함께 사용한다.                    |

`isOpen`과 `onOpenChange`는 함께 전달하거나 둘 다 생략해야 한다 (controlled / uncontrolled).

### `Popover.Trigger`

`<button>` 엘리먼트의 모든 props를 지원한다. 단, 아래 항목은 내부에서 제어하므로 전달할 수 없다:
`aria-haspopup`, `onClick`.

### `Popover.Content`

`<dialog>` 엘리먼트의 모든 props를 지원한다. 단, 아래 항목은 내부에서 제어하므로 전달할 수 없다:
`open`, `tabIndex`, `id`, `ref`.

| Prop         | 타입     | 기본값              | 설명                                                                               |
| ------------ | -------- | ------------------- | ---------------------------------------------------------------------------------- |
| `aria-label` | `string` | `"Popover Content"` | 스크린 리더가 팝오버를 식별하는 레이블. 콘텐츠를 설명하는 의미 있는 값을 권장한다. |

### `Popover.Arrow`

`<div>` 엘리먼트의 모든 props를 지원한다. `Popover.Content` 외부에서 사용하면 오류가 발생한다.

---

## Behavior

### Show / Hide

| 이벤트                   | 동작             |
| ------------------------ | ---------------- |
| 트리거 클릭              | 토글 (열기/닫기) |
| `mousedown` (외부 영역)  | 즉시 닫힘        |
| `touchstart` (외부 영역) | 즉시 닫힘        |
| `Escape`                 | 즉시 닫힘        |

### Focus Management

팝오버가 열릴 때 내부의 첫 번째 포커스 가능한 요소로 포커스가 자동 이동한다. 포커스 가능한 요소가 없으면 `<dialog>` 요소 자체에 포커스된다.

`Tab` / `Shift+Tab`으로 포커스를 이동할 때 팝오버 바깥으로 빠져나가지 않고 내부에서 순환한다. 팝오버가 닫히면 트리거 요소로 포커스가 복귀된다.

### Positioning

- **플립**: 기본 배치는 트리거 아래(`bottom`)이며, 공간이 부족하면 위(`top`)로 자동 전환된다.
- **시프트**: 뷰포트 가장자리에서 잘리지 않도록 수평 위치를 보정한다 (기본 여백 16px).
- **화살표 보정**: 시프트가 적용된 경우, `Popover.Arrow`는 항상 트리거를 가리키도록 역방향으로 보정된다.

윈도우 리사이즈 및 스크롤 시에도 위치가 재계산된다.

> **스타일 주의**: 팝오버 콘텐츠와 트리거 사이의 간격은 자동으로 추가되지 않는다. `Popover.Content`에 `margin` 또는 `padding`을 적용해 간격을 직접 지정해야 한다.

### Controlled Mode

```tsx
const [open, setOpen] = useState(false);

<Popover isOpen={open} onOpenChange={setOpen}>
  <Popover.Trigger>트리거</Popover.Trigger>
  <Popover.Content aria-label="설정">팝오버 내용</Popover.Content>
</Popover>;
```

---

## Accessibility

- `Popover.Content`는 `<dialog>` 엘리먼트로 렌더된다.
- `Popover.Trigger`에 `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`가 자동으로 설정된다.
- `Popover.Content`의 `aria-label`은 스크린 리더가 팝오버를 식별하는 데 사용된다. 기본값(`"Popover Content"`)보다 콘텐츠를 설명하는 구체적인 값을 제공할 것을 권장한다.
- `Popover.Arrow`는 `aria-hidden="true"`로 스크린 리더에서 숨긴다.
- 키보드 포커스 트랩, 자동 포커스 이동, `Escape` 키를 지원한다.

---

## Future Considerations

- **asChild prop**: 트리거를 커스텀 Element로 교체할 수 있도록 `asChild` prop을 지원
- **Portal 지원**: 클리핑 문제를 근본적으로 해결하기 위해 `document.body`에 직접 마운트하는 포털 옵션을 지원
