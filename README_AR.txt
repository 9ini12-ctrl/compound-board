تشغيل على Netlify (جاهز):

1) ارفع هذا المجلد على GitHub ثم اربطه في Netlify (Recommended).
   - أو ارفعه كـ ZIP من Netlify UI إن كان حسابك يدعم Functions من الواجهة.

2) بعد النشر افتح الموقع.

3) من الإعدادات > مزامنة جماعية:
   - سيتم تعبئة الروابط تلقائيًا:
     GET: /.netlify/functions/compounds-get
     POST: /.netlify/functions/compounds-save

4) عدّل البيانات من Manage ثم اضغط "نشر التعديل للجميع".

5) المستخدمون الآخرون سيتم تحديثهم تلقائيًا حسب مؤقت التحديث.

ملاحظة:
- لو كنت تستخدم Drag&Drop بدون Repo: غالبًا Functions لن تعمل. الأفضل GitHub.
