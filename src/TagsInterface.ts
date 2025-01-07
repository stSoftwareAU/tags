import type { TagInterface } from "./TagInterface.ts";

/**
 * Interface representing an entity that can have tags.
 */
export interface TagsInterface {
  /** Array of tags associated with the entity. */
  tags?: TagInterface[];
}

/**
 * Adds tags from the source TagsInterface to the target TagsInterface.
 *
 * @param target - The target entity to which tags will be added.
 * @param source - The source entity from which tags will be copied.
 */
export function addTags(target: TagsInterface, source: TagsInterface): void {
  if (source.tags) {
    for (let i=0; i < source.tags.length; i++) {
      const tag = source.tags[i];
      addTag(target, tag.name, tag.value);
    }
  }
}

/**
 * Adds a tag to the given TagsInterface.
 *
 * If a tag with the same name already exists, its value is updated.
 *
 * @param taggable - The entity to which the tag will be added.
 * @param name - The name of the tag.
 * @param value - The value of the tag.
 * @returns The previous value of the tag if it was updated, or null if it was added.
 */
export function addTag(
  taggable: TagsInterface,
  name: string,
  value: string,
): string | null {
  let tags = taggable.tags;
  if (!tags) {
    tags = [];
    taggable.tags = tags;
  }
  const newTag = { name: name, value: value };
  for (let i = tags.length; i--;) {
    const tag = tags[i];

    if (tag.name === name) {
      const previousValue = tag.value;
      tags[i] = newTag;
      return previousValue;
    }
  }

  tags.push(newTag);
  return null;
}

/**
 * Removes a tag from the given TagsInterface.
 *
 * @param taggable - The entity from which the tag will be removed.
 * @param name - The name of the tag to remove.
 * @returns The value of the removed tag, or null if the tag was not found.
 */
export function removeTag(
  taggable: TagsInterface,
  name: string,
): string | null {
  const tags = taggable.tags;

  if (!tags) return null;

  const pos = tags.findIndex((t) => t.name === name);

  if (pos < 0) return null;

  const previousTag = tags[pos];
  tags.splice(pos, 1);

  return previousTag.value;
}

/**
 * Retrieves the value of a tag from the given TagsInterface.
 *
 * @param taggable - The entity from which the tag value will be retrieved.
 * @param name - The name of the tag to retrieve.
 * @returns The value of the tag, or null if the tag was not found.
 */
export function getTag(taggable: TagsInterface, name: string): string | null {
  const tags = taggable.tags;

  if (!tags) return null;

  const pos = tags.findIndex((t) => t.name === name);

  if (pos < 0) return null;

  const tag = tags[pos];
  return tag.value;
}
