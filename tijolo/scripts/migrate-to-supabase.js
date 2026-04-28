/**
 * Script de migração: SQLite → Supabase
 * 
 * Execução: node scripts/migrate-to-supabase.js
 * 
 * Lê todos os registros do database.db local e os insere no Supabase.
 * Registros duplicados são ignorados silenciosamente.
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error('❌ SUPABASE_URL e SUPABASE_SECRET_KEY precisam estar no .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const dbPath = path.join(__dirname, '..', 'database.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('❌ Erro ao abrir database.db:', err.message);
    process.exit(1);
  }
  console.log('✅ Conectado ao SQLite:', dbPath);
});

async function migrate() {
  return new Promise((resolve, reject) => {
    db.all('SELECT name, email, created_at FROM waitlist ORDER BY created_at ASC', [], async (err, rows) => {
      if (err) return reject(err);

      console.log(`\n📦 ${rows.length} registro(s) encontrado(s) no SQLite.\n`);

      if (rows.length === 0) {
        console.log('Nada para migrar.');
        return resolve();
      }

      let inserted = 0;
      let skipped = 0;
      let failed = 0;

      for (const row of rows) {
        const cleanEmail = row.email.trim().toLowerCase();
        const cleanName = (row.name || 'Arquiteto').trim();

        const { error } = await supabase
          .from('waitlist')
          .insert({
            name: cleanName,
            email: cleanEmail,
            created_at: row.created_at,
          });

        if (error) {
          if (error.code === '23505') {
            console.log(`  ⚠️  Duplicado ignorado: ${cleanEmail}`);
            skipped++;
          } else {
            console.error(`  ❌ Erro ao inserir ${cleanEmail}:`, error.message);
            failed++;
          }
        } else {
          console.log(`  ✅ Migrado: ${cleanEmail}`);
          inserted++;
        }
      }

      console.log(`\n📊 Resultado:`);
      console.log(`   Inseridos : ${inserted}`);
      console.log(`   Ignorados : ${skipped}`);
      console.log(`   Falhos    : ${failed}`);
      resolve();
    });
  });
}

migrate()
  .then(() => {
    db.close();
    console.log('\n✅ Migração concluída!');
  })
  .catch((err) => {
    console.error('❌ Falha na migração:', err.message);
    db.close();
    process.exit(1);
  });
