# Generated by Django 4.0.1 on 2022-04-04 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0015_issue_issueobject_remove_glasswareissue_glassware_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='issuecart',
            name='is_new_obj',
            field=models.BooleanField(default=False),
        ),
    ]