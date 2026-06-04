#!/usr/bin/env python3
"""Generate Arabic Company Profile PDF"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_RIGHT, TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch, cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import arabic_reshaper
from bidi.algorithm import get_display
import os

# Download Arabic font
import urllib.request

font_url = "https://github.com/google/fonts/raw/main/ofl/amiri/Amiri-Regular.ttf"
font_path = "/tmp/Amiri-Regular.ttf"
font_bold_url = "https://github.com/google/fonts/raw/main/ofl/amiri/Amiri-Bold.ttf"
font_bold_path = "/tmp/Amiri-Bold.ttf"

if not os.path.exists(font_path):
    urllib.request.urlretrieve(font_url, font_path)
if not os.path.exists(font_bold_path):
    urllib.request.urlretrieve(font_bold_url, font_bold_path)

# Register Arabic fonts
pdfmetrics.registerFont(TTFont('Amiri', font_path))
pdfmetrics.registerFont(TTFont('Amiri-Bold', font_bold_path))

def arabic_text(text):
    """Reshape and reorder Arabic text for proper display"""
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)

def create_pdf():
    doc = SimpleDocTemplate(
        "/app/frontend/public/ARETION_Company_Profile_Arabic.pdf",
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    # Colors
    navy = HexColor('#1E3A5F')
    brown = HexColor('#8B4513')
    
    # Styles
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'ArabicTitle',
        parent=styles['Title'],
        fontName='Amiri-Bold',
        fontSize=28,
        textColor=navy,
        alignment=TA_CENTER,
        spaceAfter=20
    )
    
    heading_style = ParagraphStyle(
        'ArabicHeading',
        parent=styles['Heading1'],
        fontName='Amiri-Bold',
        fontSize=18,
        textColor=navy,
        alignment=TA_RIGHT,
        spaceBefore=20,
        spaceAfter=10
    )
    
    subheading_style = ParagraphStyle(
        'ArabicSubheading',
        parent=styles['Heading2'],
        fontName='Amiri-Bold',
        fontSize=14,
        textColor=brown,
        alignment=TA_RIGHT,
        spaceBefore=15,
        spaceAfter=8
    )
    
    body_style = ParagraphStyle(
        'ArabicBody',
        parent=styles['Normal'],
        fontName='Amiri',
        fontSize=12,
        textColor=HexColor('#333333'),
        alignment=TA_RIGHT,
        spaceAfter=8,
        leading=18
    )
    
    bullet_style = ParagraphStyle(
        'ArabicBullet',
        parent=body_style,
        leftIndent=20,
        bulletIndent=10
    )
    
    center_style = ParagraphStyle(
        'ArabicCenter',
        parent=body_style,
        alignment=TA_CENTER
    )
    
    story = []
    
    # Title
    story.append(Paragraph(arabic_text("الملف التعريفي للشركة"), title_style))
    story.append(Paragraph(arabic_text("شركة أركان الراي (ARETION)"), title_style))
    story.append(Spacer(1, 30))
    
    # Company Overview
    story.append(Paragraph(arabic_text("نبذة تعريفية عن الشركة"), heading_style))
    story.append(Paragraph(arabic_text(
        "شركة أركان الراي (ARETION) هي شركة تقنية سعودية متخصصة في تصميم وتطوير حلول تقنية مبتكرة ومتقدمة في مجالات إدارة الكوارث وحماية البنية التحتية الحيوية. تعمل الشركة على تحويل أنظمة السلامة والاستجابة للطوارئ من خلال منصات ذكية مدعومة بالذكاء الاصطناعي."
    ), body_style))
    story.append(Paragraph(arabic_text(
        "تقدم الشركة تسعة حلول متكاملة تغطي الإنذار المبكر، والتحليلات التنبؤية، والرعاية الصحية عن بُعد، وإدارة استمرارية الأعمال، مما يجعلها الشريك الأمثل للجهات الحكومية والبلديات والمنشآت الصحية."
    ), body_style))
    
    # Vision and Mission
    story.append(Paragraph(arabic_text("الرؤية والرسالة"), heading_style))
    story.append(Paragraph(arabic_text("الرؤية"), subheading_style))
    story.append(Paragraph(arabic_text(
        "أن نكون الشريك التقني الرائد في تحويل منظومة السلامة للبنية التحتية الحيوية على مستوى المنطقة."
    ), body_style))
    story.append(Paragraph(arabic_text("الرسالة"), subheading_style))
    story.append(Paragraph(arabic_text(
        "تحويل سلامة البنية التحتية الحيوية من خلال التقنيات المبتكرة والحلول الذكية التي تتنبأ بالمخاطر قبل وقوعها وتستجيب لها بشكل آلي وفوري."
    ), body_style))
    
    # Solutions
    story.append(Paragraph(arabic_text("الحلول والخدمات المقدمة"), heading_style))
    story.append(Paragraph(arabic_text("تقدم شركة أركان الراي تسعة حلول تقنية متكاملة:"), body_style))
    
    solutions = [
        ("نظام إدارة الكوارث (DisasterMS)", "منصة شاملة للاستجابة للكوارث مدعومة بالذكاء الاصطناعي، توفر أنظمة إنذار مبكر واستجابة آلية متكاملة."),
        ("المساعد الذكي (AI Assistant)", "محرك ذكاء اصطناعي متطور بتقنية RAG يوفر دقة عالية في الوصول للمعرفة المؤسسية واتخاذ القرارات."),
        ("التحليلات التنبؤية (Predictive Analytics)", "نماذج تعلم آلي متقدمة للتنبؤ بالمخاطر المناخية والكوارث الطبيعية قبل وقوعها."),
        ("نظام الفرز الجماعي (Mass Triage System)", "تقنية رقمية مبتكرة لتحديد الهوية والفرز في حالات الكوارث الجماعية."),
        ("شبكة الطوارئ الطبية (EM:CC Network)", "شبكة متكاملة تربط المنشآت الصحية الإقليمية لإدارة رحلة المريض بسلاسة."),
        ("التنبيب عن بُعد (Tele-Intubation)", "حل روبوتي للتنبيب عن بُعد يوفر خبرة متخصصة في إدارة مجرى الهواء الحرج."),
        ("حقيبة الشفرة الزرقاء (Code Blue Kit)", "نظام متكامل من الأجهزة والبرمجيات لتنسيق حالات الطوارئ عن بُعد."),
        ("مصمم البروتوكولات (Protocol Designer)", "منصة مدعومة بالذكاء الاصطناعي لتصميم وتنفيذ بروتوكولات الطوارئ."),
        ("منصة الاستشارات (Consultation Platform)", "بنية تحتية مرنة للرعاية الصحية عن بُعد تخدم قطاعات الطب عن بُعد والاستشارات والتعليم."),
    ]
    
    for i, (title, desc) in enumerate(solutions, 1):
        story.append(Paragraph(arabic_text(f"{i}. {title}"), subheading_style))
        story.append(Paragraph(arabic_text(desc), body_style))
    
    story.append(PageBreak())
    
    # Target Sectors
    story.append(Paragraph(arabic_text("القطاعات والعملاء المستهدفون"), heading_style))
    story.append(Paragraph(arabic_text("تخدم شركة أركان الراي القطاعات التالية:"), body_style))
    sectors = [
        "البلديات: حلول إدارة الكوارث والطوارئ للمدن والمناطق",
        "الوزارات والجهات الحكومية: أنظمة حماية البنية التحتية الحيوية",
        "القطاع الصحي: منصات الرعاية الصحية عن بُعد وإدارة الطوارئ الطبية",
        "المنشآت الحيوية: حلول الإنذار المبكر واستمرارية الأعمال",
    ]
    for sector in sectors:
        story.append(Paragraph(arabic_text(f"• {sector}"), bullet_style))
    
    # Competitive Advantages
    story.append(Paragraph(arabic_text("المزايا التنافسية"), heading_style))
    advantages = [
        ("تقنيات مبتكرة", "حلول تقنية متقدمة تتحدى الوضع الراهن وتفتح آفاقاً جديدة في مجال السلامة."),
        ("التركيز على إدارة الكوارث", "حلول مصممة خصيصاً للاستجابة للطوارئ وإدارة الأزمات."),
        ("الذكاء الاصطناعي أولاً", "التعلم الآلي والأتمتة في صميم كل حل نقدمه."),
        ("ابتكار مثبت", "أربع براءات اختراع قيد التسجيل تحمي منهجياتنا المبتكرة."),
        ("حلول مختبرة ميدانياً", "حلول تم تطويرها واختبارها من قِبل متخصصين في مجال الكوارث في حالات طوارئ حقيقية."),
        ("موثوقية حرجة", "أنظمة مصممة لضمان عدم التوقف عند الحاجة الماسة."),
    ]
    for title, desc in advantages:
        story.append(Paragraph(arabic_text(f"• {title}: {desc}"), bullet_style))
    
    # Certifications
    story.append(Paragraph(arabic_text("الاعتمادات والشهادات"), heading_style))
    story.append(Paragraph(arabic_text("تحرص شركة أركان الراي على الالتزام بأعلى معايير الأمان والجودة:"), body_style))
    certs = [
        "CSA STAR Level Two: برنامج ضمان أمان السحابة (تدقيق طرف ثالث)",
        "ISO/IEC 27001: معيار إدارة أمن المعلومات",
        "ISO/IEC 27017: ممارسات أمان المعلومات الخاصة بالسحابة",
        "ISO/IEC 27018: حماية البيانات الشخصية في السحابة",
        "PCI DSS v4.0.1: معيار أمان بيانات صناعة بطاقات الدفع",
    ]
    for cert in certs:
        story.append(Paragraph(arabic_text(f"• {cert}"), bullet_style))
    
    # Market Opportunity
    story.append(Paragraph(arabic_text("الفرص السوقية"), heading_style))
    story.append(Paragraph(arabic_text("تعمل الشركة في أسواق واعدة ومتنامية بإجمالي يتجاوز 500 مليار دولار:"), body_style))
    markets = [
        "حماية البنية التحتية الحيوية: 197 مليار دولار (نمو 5.1%)",
        "أنظمة الاستعداد للكوارث: 308 مليار دولار (نمو 8.2%)",
        "كشف الكوارث الطبيعية (إنترنت الأشياء): 25.2 مليار دولار (نمو 36.3%)",
        "إدارة استمرارية الأعمال: 2.09 مليار دولار (نمو 15.5%)",
    ]
    for market in markets:
        story.append(Paragraph(arabic_text(f"• {market}"), bullet_style))
    
    story.append(PageBreak())
    
    # Business Model
    story.append(Paragraph(arabic_text("نموذج الأعمال"), heading_style))
    story.append(Paragraph(arabic_text("تعتمد الشركة على مصادر إيرادات متنوعة ومستدامة:"), body_style))
    revenue = [
        "الأجهزة والمعدات: أجهزة الاستشعار والمراقبة مع عقود صيانة",
        "منصة SaaS: اشتراكات سنوية للمراقبة والتحليلات السحابية",
        "الاستشارات والتنفيذ: خدمات النشر والتكامل والتدريب",
        "العقود الحكومية: اتفاقيات إطارية متعددة السنوات",
        "البيانات والذكاء: تحليلات تنبؤية متقدمة وتقييم المخاطر",
        "ترخيص التقنية: ترخيص الملكية الفكرية للشركاء والموزعين",
    ]
    for item in revenue:
        story.append(Paragraph(arabic_text(f"• {item}"), bullet_style))
    
    # Golden Minute
    story.append(Paragraph(arabic_text("إنجاز بارز: الدقيقة الذهبية"), heading_style))
    story.append(Paragraph(arabic_text(
        "نفخر في شركة أركان الراي بتحقيق إنجاز استثنائي في تحسين زمن الاستجابة للطوارئ، حيث نجحنا في تقليص مفهوم \"الساعة الذهبية\" التقليدي إلى الدقيقة الذهبية من خلال أنظمة الإنذار المبكر والاستجابة الآلية المدعومة بالذكاء الاصطناعي."
    ), body_style))
    
    # Contact Information
    story.append(Spacer(1, 30))
    story.append(Paragraph(arabic_text("معلومات التواصل"), heading_style))
    
    contact_info = [
        "شركة أركان الراي",
        "مسجلة في المملكة العربية السعودية",
        "",
        "العنوان:",
        "مركز الملك عبدالله المالي (كافد)",
        "شارع الابتكار، العقيق",
        "مبنى 7229، الرياض 13519",
        "المملكة العربية السعودية",
        "",
        "+966 11 525 6458 :الهاتف",
        "Contact@aretion.org :البريد الإلكتروني",
        "https://aretion.org :الموقع الإلكتروني",
    ]
    
    for line in contact_info:
        if line:
            story.append(Paragraph(arabic_text(line), body_style))
        else:
            story.append(Spacer(1, 10))
    
    # Footer
    story.append(Spacer(1, 40))
    story.append(Paragraph(arabic_text("✓ جميع منتجاتنا جاهزة للنشر والتطبيق"), center_style))
    story.append(Spacer(1, 20))
    story.append(Paragraph(arabic_text("© 2026 شركة أركان الراي. جميع الحقوق محفوظة."), center_style))
    
    doc.build(story)
    print("PDF created successfully!")

if __name__ == "__main__":
    create_pdf()
