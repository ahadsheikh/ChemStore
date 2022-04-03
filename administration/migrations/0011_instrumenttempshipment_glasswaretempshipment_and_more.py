# Generated by Django 4.0.1 on 2022-03-30 13:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0010_rename_new_quantity_chemicalshipment_old_total_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='InstrumentTempShipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('old_total', models.PositiveIntegerField()),
                ('quantity', models.PositiveIntegerField()),
                ('instrument', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='administration.instrument')),
            ],
        ),
        migrations.CreateModel(
            name='GlasswareTempShipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('old_total', models.PositiveIntegerField()),
                ('quantity', models.PositiveIntegerField()),
                ('glassware', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='administration.glassware')),
            ],
        ),
        migrations.CreateModel(
            name='ChemicalTempShipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('old_total', models.PositiveIntegerField()),
                ('quantity', models.PositiveIntegerField()),
                ('chemical', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='administration.chemical')),
            ],
        ),
    ]