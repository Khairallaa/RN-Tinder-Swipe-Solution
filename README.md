# RN-Tinder-Swipe-Solution (حل بطاقات السحب المشابهة لـ Tinder)

هذا المشروع هو حل لتطبيق بسيط مشابه لتطبيق Tinder، يركز على تنفيذ ميزة سحب البطاقات (Swipe Cards) باستخدام مكتبتي `react-native-reanimated` و `react-native-gesture-handler` لضمان سلاسة الرسوم المتحركة.

## المتطلبات المنفذة

*   **عرض البطاقات:** يتم عرض 3 بطاقات مكدسة في الواجهة.
*   **السحب التفاعلي:** يمكن سحب البطاقة العلوية لليسار أو اليمين.
*   **سلوكيات مختلفة:**
    *   السحب لليمين (Like): يتم تسجيل "Liked!" في الكونسول.
    *   السحب لليسار (Dislike): يتم تسجيل "Disliked!" في الكونسول.
*   **الرسوم المتحركة:** تم استخدام `react-native-reanimated` لضمان أداء سلس ومستجيب.

## كيفية التشغيل

1.  **استنساخ المستودع:**
    ```bash
    git clone https://github.com/Khairallaa/RN-Tinder-Swipe-Solution.git
    cd RN-Tinder-Swipe-Solution
    ```

2.  **تثبيت التبعيات:**
    ```bash
    pnpm install
    # أو npm install / yarn install
    ```

3.  **تشغيل التطبيق:**
    ```bash
    npx expo start
    ```
    بعد التشغيل، يمكنك مسح رمز QR ضوئيًا باستخدام تطبيق Expo Go على هاتفك المحمول لمعاينة التطبيق، أو الضغط على `w` لتشغيله على الويب.

## هيكل المشروع

*   `app/(tabs)/index.tsx`: يحتوي على منطق مكدس البطاقات، ومعالجة الإيماءات (Gesture Handling)، ومنطق الرسوم المتحركة (Reanimated).
*   `components/Card.tsx`: مكون البطاقة (Card) البسيط لتصميم عرض الملف الشخصي.

---
*تم إنشاء هذا الحل بواسطة Manus-Agent بناءً على طلب المستخدم.*
