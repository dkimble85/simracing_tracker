import { beforeEach, describe, expect, it, vi } from "vitest";

import { appRouter } from "../root";

vi.mock("../../db", () => ({
  db: {},
}));

const auth = { userId: "user_123" };

const validTime = {
  trackName: "Spa-Francorchamps",
  time: "02:18:456",
  vehicle: "Ferrari 488 GT3",
  vehicleClass: "GT3",
  game: "Assetto Corsa Competizione",
};

const savedTime = {
  id: "time_123",
  ...validTime,
  createdAt: new Date("2026-04-15T12:00:00.000Z"),
  updatedAt: new Date("2026-04-15T12:00:00.000Z"),
  userId: auth.userId,
};

const createCaller = (db: unknown, userId: string | null = auth.userId) =>
  appRouter.createCaller({
    auth: { userId },
    db,
  } as never);

describe("timesRouter", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("creates a track time for the authenticated user", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-15T13:14:15.000Z"));

    const returning = vi.fn().mockResolvedValue([savedTime]);
    const values = vi.fn().mockReturnValue({ returning });
    const insert = vi.fn().mockReturnValue({ values });
    const caller = createCaller({ insert });

    await expect(caller.times.addTime(validTime)).resolves.toEqual(savedTime);
    expect(insert).toHaveBeenCalledOnce();
    expect(values).toHaveBeenCalledWith({
      ...validTime,
      userId: auth.userId,
      updatedAt: new Date("2026-04-15T13:14:15.000Z"),
    });
    expect(returning).toHaveBeenCalledOnce();
  });

  it("returns only track times selected for the authenticated user", async () => {
    const where = vi.fn().mockResolvedValue([savedTime]);
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    const caller = createCaller({ select });

    await expect(caller.times.getAllTimes()).resolves.toEqual([savedTime]);
    expect(select).toHaveBeenCalledOnce();
    expect(from).toHaveBeenCalledOnce();
    expect(where).toHaveBeenCalledOnce();
  });

  it("returns one user-owned track time by id", async () => {
    const limit = vi.fn().mockResolvedValue([savedTime]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    const caller = createCaller({ select });

    await expect(caller.times.getTime({ timeId: savedTime.id })).resolves.toEqual(
      savedTime,
    );
    expect(where).toHaveBeenCalledOnce();
    expect(limit).toHaveBeenCalledWith(1);
  });

  it("rejects when a requested track time is not owned by the user", async () => {
    const limit = vi.fn().mockResolvedValue([]);
    const where = vi.fn().mockReturnValue({ limit });
    const from = vi.fn().mockReturnValue({ where });
    const select = vi.fn().mockReturnValue({ from });
    const caller = createCaller({ select });

    await expect(
      caller.times.getTime({ timeId: "someone_elses_time" }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("updates a user-owned track time and refreshes updatedAt", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-15T14:15:16.000Z"));

    const returning = vi.fn().mockResolvedValue([savedTime]);
    const where = vi.fn().mockReturnValue({ returning });
    const set = vi.fn().mockReturnValue({ where });
    const update = vi.fn().mockReturnValue({ set });
    const caller = createCaller({ update });

    await expect(
      caller.times.editTime({ id: savedTime.id, data: validTime }),
    ).resolves.toEqual(savedTime);
    expect(update).toHaveBeenCalledOnce();
    expect(set).toHaveBeenCalledWith({
      ...validTime,
      updatedAt: new Date("2026-04-15T14:15:16.000Z"),
    });
    expect(where).toHaveBeenCalledOnce();
    expect(returning).toHaveBeenCalledOnce();
  });

  it("deletes a user-owned track time", async () => {
    const returning = vi.fn().mockResolvedValue([{ id: savedTime.id }]);
    const where = vi.fn().mockReturnValue({ returning });
    const deleteFrom = vi.fn().mockReturnValue({ where });
    const caller = createCaller({ delete: deleteFrom });

    await expect(caller.times.deleteTime(savedTime.id)).resolves.toBe(
      savedTime.id,
    );
    expect(deleteFrom).toHaveBeenCalledOnce();
    expect(where).toHaveBeenCalledOnce();
    expect(returning).toHaveBeenCalledOnce();
  });

  it("requires authentication", async () => {
    const caller = createCaller({}, null);

    await expect(caller.times.getAllTimes()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });
});
