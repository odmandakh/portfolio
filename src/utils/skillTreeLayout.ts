import { Skill, SkillStatus, SkillTree } from '../types/portfolio';

export type SkillTreeSlug = SkillTree['slug'];

export interface LaidOutNode {
  key: string; // unique across trees: `${slug}:${id}`
  slug: SkillTreeSlug;
  kind: 'root' | 'topic' | 'subtopic';
  label: string;
  status: SkillStatus;
  description: string;
  usedIn?: string;
  x: number; // centre, in canvas px
  y: number;
  parentKey: string | null;
  childKeys: string[];
  topicNumber?: number;
}

export interface Cluster {
  slug: SkillTreeSlug;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SkillTreeLayout {
  nodes: LaidOutNode[];
  byKey: Map<string, LaidOutNode>;
  clusters: Cluster[];
  width: number;
  height: number;
}

const SLOT_W = 112;
const ROW_H = 108;
const PER_SIDE = 3; // subtopics on each side of a topic per row
const CLUSTER_W = (PER_SIDE * 2 + 1) * SLOT_W;
const CLUSTER_GAP = 72;
const MARGIN = 24;
const HEADER_H = 64;

// Slot offsets for a row of subtopics, alternating sides outward from the topic: -1, +1, -2, +2, ...
const SLOT_ORDER = Array.from({ length: PER_SIDE * 2 }, (_, i) => (i % 2 === 0 ? -1 : 1) * (Math.floor(i / 2) + 1));

// One column per tree: the tree's root at the top, its branches (topics) down the middle in
// order (each unlocking the next), and each branch's skills fanned out on both sides of it.
export function layoutSkillTrees(trees: SkillTree[]): SkillTreeLayout {
  const nodes: LaidOutNode[] = [];
  const clusters: Cluster[] = [];

  trees.forEach((tree, treeIndex) => {
    const left = MARGIN + treeIndex * (CLUSTER_W + CLUSTER_GAP);
    const centerX = left + CLUSTER_W / 2;
    const key = (id: string) => `${tree.slug}:${id}`;

    const skillFields = (skill: Skill) => ({
      label: skill.label,
      status: skill.status,
      description: skill.description,
      usedIn: skill.usedIn
    });

    const root: LaidOutNode = {
      key: key('root'),
      slug: tree.slug,
      kind: 'root',
      label: tree.title,
      status: 'done',
      description: tree.description,
      x: centerX,
      y: MARGIN + HEADER_H + 40,
      parentKey: null,
      childKeys: []
    };
    nodes.push(root);

    let previous = root;
    let y = root.y + ROW_H * 1.15;

    tree.branches.forEach((topic, topicIndex) => {
      const topicNode: LaidOutNode = {
        key: key(topic.id),
        slug: tree.slug,
        kind: 'topic',
        ...skillFields(topic),
        x: centerX,
        y,
        parentKey: previous.key,
        childKeys: [],
        topicNumber: topicIndex + 1
      };
      previous.childKeys.push(topicNode.key);
      nodes.push(topicNode);

      topic.skills.forEach((child, childIndex) => {
        const row = Math.floor(childIndex / SLOT_ORDER.length);
        const slot = SLOT_ORDER[childIndex % SLOT_ORDER.length];
        const childNode: LaidOutNode = {
          key: key(child.id),
          slug: tree.slug,
          kind: 'subtopic',
          ...skillFields(child),
          x: centerX + slot * SLOT_W,
          y: y + row * ROW_H,
          parentKey: topicNode.key,
          childKeys: []
        };
        topicNode.childKeys.push(childNode.key);
        nodes.push(childNode);
      });

      const rows = Math.max(1, Math.ceil(topic.skills.length / SLOT_ORDER.length));
      y += rows * ROW_H + ROW_H * 0.25;
      previous = topicNode;
    });

    clusters.push({ slug: tree.slug, title: tree.title, x: left, y: MARGIN, width: CLUSTER_W, height: y - MARGIN });
  });

  const width = MARGIN * 2 + trees.length * CLUSTER_W + Math.max(0, trees.length - 1) * CLUSTER_GAP;
  const height = Math.max(...clusters.map((c) => c.y + c.height)) + MARGIN;
  return { nodes, byKey: new Map(nodes.map((n) => [n.key, n])), clusters, width, height };
}
