#!/usr/bin/env python3
"""Non-mutating structural/content-risk audit. Does NOT certify regulatory accuracy."""
import json, re, collections
from pathlib import Path

rows=[];flags=[]
for batch in range(1,7):
    path=Path(f'questions-batch-{batch:02}.json')
    questions=json.loads(path.read_text(encoding='utf-8'))
    if len(questions)!=50:flags.append(f'{path}: expected 50 questions, found {len(questions)}')
    rows.extend(questions)
    for q in questions:
        ident=q.get('id','?'); options=q.get('options',[]); answer=q.get('answer')
        if len(options)!=4:flags.append(f'{ident}: expected 4 options')
        if type(answer)!=int or not 0<=answer<len(options):flags.append(f'{ident}: invalid answer index')
        if len(set(str(o).strip().casefold() for o in options))!=len(options):flags.append(f'{ident}: duplicate choices')
        if len(str(q.get('explanation','')).split())<12:flags.append(f'{ident}: short explanation; review for educational clarity')
        visible=' '.join(str(q.get(k,'')) for k in ('question','explanation'))
        if re.search(r'\b(powerpoint|slides?|presentation)\b|expert validation pending',visible,re.I):flags.append(f'{ident}: student-visible slide/presentation wording')
        if re.search(r'\b(\d+\s*(?:years?|days?|hours?|gallons?|oz|feet|inches))\b',visible,re.I):flags.append(f'{ident}: numeric rule/rate may need source-specific verification')
        if re.search(r'\b(tennessee|registration|recertification|r[eE][iI]|restricted.use|quarantine|certif|licensed|law|shall|must)\b',visible,re.I):flags.append(f'{ident}: possible regulatory claim; check current authorities')

norm=lambda s:re.sub(r'[^a-z0-9]+',' ',s.casefold()).strip()
counts=collections.Counter(norm(q.get('question','')) for q in rows)
for q in rows:
    if counts[norm(q.get('question',''))]>1:flags.append(f'{q.get("id")}: duplicate question wording')
ids=collections.Counter(q.get('id') for q in rows)
for k,v in ids.items():
    if v>1:flags.append(f'{k}: duplicate identifier')
report=['Tennessee Category 7 — Structural and Editorial Audit','',f'Question records: {len(rows)}',f'Unique IDs: {len(ids)}',f'Unique normalized question stems: {len(counts)}',f'Review flags (not necessarily errors): {len(flags)}','','This report does not independently verify pesticide label directions, state laws, or scientific accuracy.','']
report+=['- '+flag for flag in flags] or ['No structural/editorial flags generated.']
Path('CATEGORY7_AUDIT_REPORT.txt').write_text('\n'.join(report)+'\n',encoding='utf-8')
print('\n'.join(report[:9]))
if len(rows)!=300 or len(ids)!=300 or len(counts)!=300:raise SystemExit('FAILED: count or uniqueness check')
print('PASS: exactly 300 entries with unique IDs and normalized stems. Review the flags in CATEGORY7_AUDIT_REPORT.txt.')
