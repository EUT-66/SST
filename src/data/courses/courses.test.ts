import { describe, expect, it } from 'vitest';
import { COURSE_MIT } from '../courseMit';
import { DEFAULT_TRADES } from '../trades';
import { TRADE_COURSES } from './index';
import { checkSpec } from './specCheck';
import { spec as mitSpec } from './specs/mitReference';
import { buildTradeCourse, type TradeCourseSpec } from './tradeCourse';

const tradeIds = DEFAULT_TRADES.map((t) => t.id);
const allSpecs = Object.entries(import.meta.glob<{ spec: TradeCourseSpec }>('./specs/*.ts', { eager: true }));

describe('gabarit des cours métiers', () => {
  it('reproduit la structure du cours MIT de la formatrice', () => {
    const built = buildTradeCourse(mitSpec, 1);
    expect(built.slides).toHaveLength(COURSE_MIT.slides.length);
    built.slides.forEach((s, i) => {
      expect(s.layout, `diapo ${i + 1}`).toBe(COURSE_MIT.slides[i].layout);
      expect(s.title, `diapo ${i + 1}`).toBe(COURSE_MIT.slides[i].title);
      expect(s.items?.length ?? 0, `diapo ${i + 1}`).toBe(COURSE_MIT.slides[i].items?.length ?? 0);
    });
  });

  for (const [path, mod] of allSpecs) {
    const code = mod.spec?.code ?? path;
    it(`fiche ${code} valide`, () => {
      expect(checkSpec(mod.spec, tradeIds)).toEqual([]);
      const course = buildTradeCourse(mod.spec, 9);
      expect(course.slides).toHaveLength(56);
      expect(new Set(course.slides.map((s) => s.id)).size).toBe(56);
      expect(JSON.stringify(course)).not.toMatch(/undefined/);
    });
  }

  it('identifiants de cours uniques', () => {
    const ids = TRADE_COURSES.map((c) => c.id);
    expect(new Set([...ids, COURSE_MIT.id]).size).toBe(ids.length + 1);
  });
});
