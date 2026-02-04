رفع بدون تعقيد (Netlify + GitHub):

1) فك الضغط.
2) GitHub > Add file > Upload files
3) ادخل للمجلد بعد فك الضغط ثم حدِّد كل ما بداخله (index.html + netlify.toml + package.json + مجلد netlify)
4) اسحب الملفات المحددة إلى GitHub (لا تسحب "المجلد" نفسه حتى لا يصير داخل مجلد).
5) Netlify: Trigger deploy (Clear cache and deploy).

اختبار:

افتح بعد الرفع:
/data/compounds_data.json
لازم يرجّع JSON (مو 404).

ملاحظة مهمة:
- التطبيق الآن يعتمد افتراضيًا على هذا الملف كمصدر بيانات مركزي للجميع.
- لتحديث البيانات للجميع: حدّث ملف JSON على السيرفر (أو داخل GitHub ثم Deploy).
