# Class: `abstract` AbstractAggregate\<TId, TProps\>

Lớp trừu tượng cơ sở cho Aggregate Root trong Domain Driven Design.

Aggregate Root là Entity chính trong một Consistency Boundary và quản lý Domain Events.
Nó đảm bảo tính nhất quán của dữ liệu trong một nhóm các Entity liên quan.

## Example

```typescript
class Order extends AbstractAggregate<UuidId> {
  constructor(id: UuidId) {
    super(id);
  }

  public placeOrder(): void {
    // Business logic
    this.addDomainEvent(new OrderPlacedEvent(this.id));
  }
}
```

## Extends

- [`AbstractEntity`](/libraries/common-domain/Class.AbstractEntity.md)\<`TId`, `TProps`\>

## Type Parameters

### TId

`TId` _extends_ [`AbstractId`](/libraries/common-domain/Class.AbstractId.md)

Kiểu dữ liệu của ID, phải kế thừa từ AbstractId

### TProps

`TProps` _extends_ [`IEntityProps`](/libraries/common-domain/Interface.IEntityProps.md)\<`TId`\>

## Constructors

<a id="constructor"></a>

### Constructor

> **new AbstractAggregate**\<`TId`, `TProps`\>(`props`): `AbstractAggregate`\<`TId`, `TProps`\>

Tạo một instance mới của Aggregate Root.

#### Parameters

##### props

`TProps`

props của Aggregate Root

#### Returns

`AbstractAggregate`\<`TId`, `TProps`\>

#### Overrides

[`AbstractEntity`](/libraries/common-domain/Class.AbstractEntity.md).[`constructor`](/libraries/common-domain/Class.AbstractEntity.md#constructor)

## Properties

<a id="props"></a>

### props

> `protected` **props**: `TProps`

#### Inherited from

[`AbstractEntity`](/libraries/common-domain/Class.AbstractEntity.md).[`props`](/libraries/common-domain/Class.AbstractEntity.md#props)

## Accessors

<a id="id"></a>

### id

#### Get Signature

> **get** **id**(): `TId`

Lấy id của Entity

##### Returns

`TId`

id của entity

#### Inherited from

[`AbstractEntity`](/libraries/common-domain/Class.AbstractEntity.md).[`id`](/libraries/common-domain/Class.AbstractEntity.md#id)

## Methods

<a id="adddomainevent"></a>

### addDomainEvent()

> `protected` **addDomainEvent**(`domainEvent`): `void`

Thêm một Domain Event vào danh sách các sự kiện chưa được publish.
Method này chỉ nên được gọi từ bên trong Aggregate Root.

#### Parameters

##### domainEvent

[`IDomainEvent`](/libraries/common-domain/Interface.IDomainEvent.md)

Domain Event cần thêm

#### Returns

`void`

#### Example

```typescript
protected placeOrder(): void {
  // Business logic
  this.addDomainEvent(new OrderPlacedEvent(this.id));
}
```

---

<a id="adddomainevents"></a>

### addDomainEvents()

> `protected` **addDomainEvents**(`domainEvents`): `void`

Thêm một mảng các Domain Event vào danh sách các sự kiện chưa được publish.
Method này chỉ nên được gọi từ bên trong Aggregate Root.

#### Parameters

##### domainEvents

[`IDomainEvent`](/libraries/common-domain/Interface.IDomainEvent.md)[]

Mảng các Domain Event cần thêm

#### Returns

`void`

#### Example

```typescript
protected addDomainEvents(domainEvents: IDomainEvent[]): void {
  this.domainEvents.push(...domainEvents);
}
```

---

<a id="cleardomainevents"></a>

### clearDomainEvents()

> **clearDomainEvents**(): `void`

Xóa tất cả các Domain Event đã được publish.
Method này nên được gọi sau khi các event đã được xử lý thành công.

#### Returns

`void`

#### Example

```typescript
const events = aggregateRoot.getDomainEvents();
await eventBus.publish(events);
aggregateRoot.clearDomainEvents();
```

---

<a id="equals"></a>

### equals()

> **equals**(`entity?`): `boolean`

So sánh hai Entity dựa trên ID và loại của chúng.
Hai Entity được coi là bằng nhau nếu:

1. Chúng là cùng một loại Entity (cùng constructor)
2. Chúng có cùng ID

#### Parameters

##### entity?

[`AbstractEntity`](/libraries/common-domain/Class.AbstractEntity.md)\<`TId`, `TProps`\>

Entity khác để so sánh

#### Returns

`boolean`

true nếu hai Entity bằng nhau, ngược lại là false

#### Example

```typescript
const product1 = new Product(new UuidId());
const product2 = new Product(new UuidId());
const order = new Order(new UuidId());

console.log(product1.equals(product2)); // false (khác ID)
console.log(product1.equals(order)); // false (khác loại)
```

#### Inherited from

[`AbstractEntity`](/libraries/common-domain/Class.AbstractEntity.md).[`equals`](/libraries/common-domain/Class.AbstractEntity.md#equals)

---

<a id="getdomainevents"></a>

### getDomainEvents()

> **getDomainEvents**(): [`IDomainEvent`](/libraries/common-domain/Interface.IDomainEvent.md)[]

Lấy danh sách các Domain Event chưa được publish.
Trả về một bản sao của mảng để tránh việc sửa đổi trực tiếp.

#### Returns

[`IDomainEvent`](/libraries/common-domain/Interface.IDomainEvent.md)[]

Mảng các Domain Event

#### Example

```typescript
const events = aggregateRoot.getDomainEvents();
for (const event of events) {
  await eventBus.publish(event);
}
```
