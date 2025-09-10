import { Migration } from '@mikro-orm/migrations';

export class Migration20250910124341 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "custom" add column if not exists "certificering" jsonb null, add column if not exists "stekker" jsonb null, add column if not exists "waterbestendigheid" jsonb null, add column if not exists "kabel_lengte" jsonb null, add column if not exists "garantie" jsonb null, add column if not exists "soort" jsonb null, add column if not exists "gewicht" jsonb null, add column if not exists "maximaal_laadvermogen" jsonb null, add column if not exists "soort_lader" jsonb null, add column if not exists "vermogen" jsonb null, add column if not exists "soort_kabel" jsonb null, add column if not exists "geadviseerd_voor" jsonb null, add column if not exists "opties" jsonb null, add column if not exists "lengte" jsonb null, add column if not exists "type_Stekker" jsonb null, add column if not exists "laadvermogen" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "custom" drop column if exists "certificering", drop column if exists "stekker", drop column if exists "waterbestendigheid", drop column if exists "kabel_lengte", drop column if exists "garantie", drop column if exists "soort", drop column if exists "gewicht", drop column if exists "maximaal_laadvermogen", drop column if exists "soort_lader", drop column if exists "vermogen", drop column if exists "soort_kabel", drop column if exists "geadviseerd_voor", drop column if exists "opties", drop column if exists "lengte", drop column if exists "type_Stekker", drop column if exists "laadvermogen";`);
  }

}
