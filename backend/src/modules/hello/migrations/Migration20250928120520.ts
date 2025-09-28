import { Migration } from '@mikro-orm/migrations';

export class Migration20250928120520 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "custom" add column if not exists "maindescription_html" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "custom" drop column if exists "maindescription_html";`);
  }

}
