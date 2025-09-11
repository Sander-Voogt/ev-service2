import { Migration } from '@mikro-orm/migrations';

export class Migration20250911123848 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "custom" add column if not exists "pros" jsonb null, add column if not exists "cons" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "custom" drop column if exists "pros", drop column if exists "cons";`);
  }

}
