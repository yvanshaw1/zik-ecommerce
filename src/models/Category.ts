export class Category {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly emoji: string;

  constructor(params: {
    id: string;
    name: string;
    image: string;
    emoji: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.image = params.image;
    this.emoji = params.emoji;
  }

  matches(id: string): boolean {
    return this.id === id;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      emoji: this.emoji,
    };
  }
}
