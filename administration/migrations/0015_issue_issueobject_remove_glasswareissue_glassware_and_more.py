# Generated by Django 4.0.1 on 2022-04-02 21:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0014_remove_storeissue_issue_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('store_consumer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='administration.storeconsumer')),
            ],
        ),
        migrations.CreateModel(
            name='IssueObject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveBigIntegerField()),
                ('object_type', models.CharField(choices=[('CHEMICAL', 'Chemical'), ('GLASSWARE', 'Glassware'), ('INSTRUMENT', 'Instrument')], max_length=10)),
                ('old_total', models.FloatField()),
                ('quantity', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administration.issue')),
            ],
        ),
        migrations.RemoveField(
            model_name='glasswareissue',
            name='glassware',
        ),
        migrations.RemoveField(
            model_name='glasswareissue',
            name='issue',
        ),
        migrations.RemoveField(
            model_name='instrumentissue',
            name='instrument',
        ),
        migrations.RemoveField(
            model_name='instrumentissue',
            name='issue',
        ),
        migrations.RemoveField(
            model_name='storeissue',
            name='store_consumer',
        ),
        migrations.DeleteModel(
            name='ChemicalIssue',
        ),
        migrations.DeleteModel(
            name='GlasswareIssue',
        ),
        migrations.DeleteModel(
            name='InstrumentIssue',
        ),
        migrations.DeleteModel(
            name='StoreIssue',
        ),
    ]
